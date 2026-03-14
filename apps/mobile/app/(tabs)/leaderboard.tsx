import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

type TabKey = "players" | "practitioners";

interface PlayerEntry {
  rank: number;
  name: string;
  elo: number;
  teamElo: string;
  wins: number;
  losses: number;
  streak: number;
}

interface PractitionerEntry {
  rank: number;
  name: string;
  readings: number;
  streak: number;
  milestones: number;
  encyclopediaPercent: number;
}

const MOCK_PLAYERS: PlayerEntry[] = [
  { rank: 1, name: "Soror NSMA", elo: 1847, teamElo: "F+A: 1920", wins: 142, losses: 58, streak: 7 },
  { rank: 2, name: "Frater LVX", elo: 1792, teamElo: "W+E: 1810", wins: 128, losses: 72, streak: 3 },
  { rank: 3, name: "Soror AV", elo: 1756, teamElo: "F+A: 1780", wins: 115, losses: 85, streak: 0 },
  { rank: 4, name: "Frater DR", elo: 1698, teamElo: "W+E: 1720", wins: 98, losses: 92, streak: 2 },
  { rank: 5, name: "Soror PM", elo: 1645, teamElo: "F+A: 1670", wins: 87, losses: 103, streak: 0 },
];

const MOCK_PRACTITIONERS: PractitionerEntry[] = [
  { rank: 1, name: "Soror NSMA", readings: 365, streak: 42, milestones: 12, encyclopediaPercent: 94 },
  { rank: 2, name: "Frater DR", readings: 218, streak: 15, milestones: 8, encyclopediaPercent: 78 },
  { rank: 3, name: "Soror AV", readings: 156, streak: 0, milestones: 6, encyclopediaPercent: 65 },
  { rank: 4, name: "Frater LVX", readings: 89, streak: 3, milestones: 4, encyclopediaPercent: 52 },
  { rank: 5, name: "Soror PM", readings: 45, streak: 7, milestones: 2, encyclopediaPercent: 31 },
];

export default function LeaderboardTab() {
  const [tab, setTab] = useState<TabKey>("players");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Leaderboard</Text>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, tab === "players" && styles.tabActive]}
          onPress={() => setTab("players")}
        >
          <Text style={[styles.tabText, tab === "players" && styles.tabTextActive]}>Players</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === "practitioners" && styles.tabActive]}
          onPress={() => setTab("practitioners")}
        >
          <Text style={[styles.tabText, tab === "practitioners" && styles.tabTextActive]}>Practitioners</Text>
        </TouchableOpacity>
      </View>

      {tab === "players" &&
        MOCK_PLAYERS.map((p) => (
          <View key={p.rank} style={styles.card}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>#{p.rank}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.name}>{p.name}</Text>
              <Text style={styles.stat}>ELO {p.elo} | {p.teamElo}</Text>
              <Text style={styles.stat}>
                {p.wins}W / {p.losses}L{p.streak > 0 ? ` | ${p.streak} streak` : ""}
              </Text>
            </View>
          </View>
        ))}

      {tab === "practitioners" &&
        MOCK_PRACTITIONERS.map((p) => (
          <View key={p.rank} style={styles.card}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>#{p.rank}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.name}>{p.name}</Text>
              <Text style={styles.stat}>
                {p.readings} readings | {p.streak > 0 ? `${p.streak} day streak` : "No active streak"}
              </Text>
              <Text style={styles.stat}>
                {p.milestones} milestones | {p.encyclopediaPercent}% encyclopedia
              </Text>
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F0F" },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#D4AF37", marginBottom: 16 },
  tabRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  tab: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
  },
  tabActive: { borderColor: "#D4AF37", backgroundColor: "#D4AF3715" },
  tabText: { fontSize: 14, color: "#A3A3A3" },
  tabTextActive: { color: "#D4AF37", fontWeight: "600" },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
  },
  rankText: { fontSize: 14, fontWeight: "bold", color: "#D4AF37" },
  cardContent: { flex: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: "600", color: "#E5E5E5" },
  stat: { fontSize: 12, color: "#A3A3A3" },
});
