-- Enochian Chess Database Schema
-- Supabase (Postgres) with Row Level Security

-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT NOT NULL DEFAULT 'Neophyte',
  motto TEXT, -- GD-style motto (e.g., "Soror NSMA")
  preferred_element TEXT CHECK (preferred_element IN ('FIRE', 'WATER', 'AIR', 'EARTH')),

  -- ELO Ratings
  elo_individual INTEGER NOT NULL DEFAULT 1200,
  elo_fire_air INTEGER NOT NULL DEFAULT 1200,
  elo_water_earth INTEGER NOT NULL DEFAULT 1200,

  -- Game Stats
  games_played INTEGER NOT NULL DEFAULT 0,
  games_won INTEGER NOT NULL DEFAULT 0,
  games_lost INTEGER NOT NULL DEFAULT 0,
  current_win_streak INTEGER NOT NULL DEFAULT 0,
  best_win_streak INTEGER NOT NULL DEFAULT 0,

  -- Practitioner Stats
  readings_performed INTEGER NOT NULL DEFAULT 0,
  reading_streak_current INTEGER NOT NULL DEFAULT 0,
  reading_streak_best INTEGER NOT NULL DEFAULT 0,
  last_reading_date DATE,
  mastery_milestones INTEGER NOT NULL DEFAULT 0,

  -- Encyclopedia Progress (JSONB: { "piece_osiris": true, "square_a1": true, ... })
  encyclopedia_progress JSONB NOT NULL DEFAULT '{}',
  encyclopedia_percent REAL NOT NULL DEFAULT 0,

  -- Tier
  is_paid BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Games (completed games for history and replay)
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opening_element TEXT NOT NULL CHECK (opening_element IN ('FIRE', 'WATER', 'AIR', 'EARTH')),
  concourse JSONB NOT NULL, -- { team1: [...], team2: [...] }
  players JSONB NOT NULL, -- { FIRE: uuid|"AI", WATER: uuid|"AI", ... }
  mode TEXT NOT NULL CHECK (mode IN ('GAME', 'DIVINATION')),

  move_history JSONB NOT NULL DEFAULT '[]',
  final_state JSONB,

  winner_team TEXT CHECK (winner_team IN ('TEAM1', 'TEAM2', 'STALEMATE')),
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Divination Readings
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  query TEXT NOT NULL,
  query_element TEXT NOT NULL CHECK (query_element IN ('FIRE', 'WATER', 'AIR', 'EARTH')),
  game_id UUID REFERENCES games(id),

  piece_readings JSONB NOT NULL,
  dignity_interactions JSONB NOT NULL,
  summary TEXT NOT NULL,

  saved BOOLEAN NOT NULL DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Real-time Game Sessions (for online multiplayer)
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,

  host_id UUID REFERENCES profiles(id) NOT NULL,
  players JSONB NOT NULL DEFAULT '{}', -- { FIRE: {user_id, ready}, ... }

  current_state JSONB,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'in_progress', 'completed')),

  max_players INTEGER NOT NULL DEFAULT 4,
  is_team_mode BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Matchmaking Queue
CREATE TABLE matchmaking_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  mode TEXT NOT NULL CHECK (mode IN ('team_2p', 'full_4p')),
  preferred_element TEXT CHECK (preferred_element IN ('FIRE', 'WATER', 'AIR', 'EARTH')),
  elo INTEGER NOT NULL,

  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_profiles_elo ON profiles(elo_individual DESC);
CREATE INDEX idx_profiles_readings ON profiles(readings_performed DESC);
CREATE INDEX idx_profiles_encyclopedia ON profiles(encyclopedia_percent DESC);
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_games_created ON games(created_at DESC);
CREATE INDEX idx_readings_user ON readings(user_id, created_at DESC);
CREATE INDEX idx_readings_saved ON readings(user_id, saved) WHERE saved = TRUE;
CREATE INDEX idx_sessions_status ON game_sessions(status);
CREATE INDEX idx_matchmaking_mode ON matchmaking_queue(mode, elo);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE matchmaking_queue ENABLE ROW LEVEL SECURITY;

-- Profiles: read by anyone, update only own
CREATE POLICY "Profiles are publicly viewable" ON profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Games: readable by participants, insertable by authenticated
CREATE POLICY "Games are publicly viewable" ON games
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create games" ON games
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Participants can update games" ON games
  FOR UPDATE USING (
    players->>'FIRE' = auth.uid()::text OR
    players->>'WATER' = auth.uid()::text OR
    players->>'AIR' = auth.uid()::text OR
    players->>'EARTH' = auth.uid()::text
  );

-- Readings: only own
CREATE POLICY "Users can view own readings" ON readings
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own readings" ON readings
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own readings" ON readings
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own readings" ON readings
  FOR DELETE USING (auth.uid() = user_id);

-- Game Sessions: publicly viewable for lobby, updatable by participants
CREATE POLICY "Sessions are publicly viewable" ON game_sessions
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create sessions" ON game_sessions
  FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Host can update session" ON game_sessions
  FOR UPDATE USING (auth.uid() = host_id);

-- Matchmaking: own entries only
CREATE POLICY "Users can view matchmaking queue" ON matchmaking_queue
  FOR SELECT USING (true);
CREATE POLICY "Users can join queue" ON matchmaking_queue
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave queue" ON matchmaking_queue
  FOR DELETE USING (auth.uid() = user_id);

-- Function: Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'display_name', 'Neophyte'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function: Update reading streak
CREATE OR REPLACE FUNCTION public.update_reading_streak()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles SET
    readings_performed = readings_performed + 1,
    last_reading_date = CURRENT_DATE,
    reading_streak_current = CASE
      WHEN last_reading_date = CURRENT_DATE - INTERVAL '1 day' THEN reading_streak_current + 1
      WHEN last_reading_date = CURRENT_DATE THEN reading_streak_current
      ELSE 1
    END,
    reading_streak_best = GREATEST(reading_streak_best,
      CASE
        WHEN last_reading_date = CURRENT_DATE - INTERVAL '1 day' THEN reading_streak_current + 1
        ELSE 1
      END
    ),
    updated_at = NOW()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_reading_created
  AFTER INSERT ON readings
  FOR EACH ROW EXECUTE FUNCTION public.update_reading_streak();

-- Enable Realtime for game sessions
ALTER PUBLICATION supabase_realtime ADD TABLE game_sessions;
