import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (matching our schema)
export interface Profile {
  id: string;
  display_name: string;
  motto: string | null;
  preferred_element: string | null;
  elo_individual: number;
  elo_fire_air: number;
  elo_water_earth: number;
  games_played: number;
  games_won: number;
  games_lost: number;
  current_win_streak: number;
  best_win_streak: number;
  readings_performed: number;
  reading_streak_current: number;
  reading_streak_best: number;
  last_reading_date: string | null;
  mastery_milestones: number;
  encyclopedia_progress: Record<string, boolean>;
  encyclopedia_percent: number;
  is_paid: boolean;
  created_at: string;
  updated_at: string;
}

export interface GameRecord {
  id: string;
  opening_element: string;
  concourse: { team1: string[]; team2: string[] };
  players: Record<string, string>;
  mode: string;
  move_history: unknown[];
  final_state: unknown;
  winner_team: string | null;
  status: string;
  created_at: string;
  completed_at: string | null;
}

export interface ReadingRecord {
  id: string;
  user_id: string;
  query: string;
  query_element: string;
  game_id: string | null;
  piece_readings: unknown[];
  dignity_interactions: unknown[];
  summary: string;
  saved: boolean;
  tags: string[];
  notes: string | null;
  created_at: string;
}

export interface GameSession {
  id: string;
  game_id: string | null;
  host_id: string;
  players: Record<string, { user_id: string; ready: boolean }>;
  current_state: unknown;
  status: "waiting" | "in_progress" | "completed";
  max_players: number;
  is_team_mode: boolean;
  created_at: string;
  updated_at: string;
}

// Helper functions
export async function getLeaderboard(
  type: "players" | "practitioners",
  limit = 50
) {
  if (type === "players") {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, display_name, motto, elo_individual, elo_fire_air, elo_water_earth, games_won, games_lost, current_win_streak, best_win_streak"
      )
      .order("elo_individual", { ascending: false })
      .limit(limit);
    return { data, error };
  } else {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, display_name, motto, readings_performed, reading_streak_current, reading_streak_best, mastery_milestones, encyclopedia_percent"
      )
      .order("readings_performed", { ascending: false })
      .limit(limit);
    return { data, error };
  }
}

export async function saveReading(
  userId: string,
  reading: {
    query: string;
    queryElement: string;
    pieceReadings: unknown[];
    dignityInteractions: unknown[];
    summary: string;
  }
) {
  const { data, error } = await supabase.from("readings").insert({
    user_id: userId,
    query: reading.query,
    query_element: reading.queryElement,
    piece_readings: reading.pieceReadings,
    dignity_interactions: reading.dignityInteractions,
    summary: reading.summary,
    saved: true,
  });
  return { data, error };
}

export async function createGameSession(
  hostId: string,
  isTeamMode: boolean
) {
  const { data, error } = await supabase
    .from("game_sessions")
    .insert({
      host_id: hostId,
      is_team_mode: isTeamMode,
      status: "waiting",
    })
    .select()
    .single();
  return { data, error };
}

export function subscribeToGameSession(
  sessionId: string,
  callback: (session: GameSession) => void
) {
  return supabase
    .channel(`session:${sessionId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "game_sessions",
        filter: `id=eq.${sessionId}`,
      },
      (payload) => {
        callback(payload.new as GameSession);
      }
    )
    .subscribe();
}
