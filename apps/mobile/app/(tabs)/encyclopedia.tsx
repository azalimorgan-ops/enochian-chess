import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { GOD_FORMS } from "@enochian-chess/data";
import { ALL_PIECE_TEMPLATES, Element } from "@enochian-chess/data";

type TabKey = "pieces" | "dignities" | "history";

const ELEMENT_COLORS: Record<string, string> = {
  FIRE: "#DC2626",
  WATER: "#2563EB",
  AIR: "#EAB308",
  EARTH: "#16A34A",
};

export default function EncyclopediaTab() {
  const [tab, setTab] = useState<TabKey>("pieces");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Encyclopedia</Text>

      <View style={styles.tabRow}>
        {(["pieces", "dignities", "history"] as TabKey[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === "pieces" && (
        <View>
          {ALL_PIECE_TEMPLATES.map((piece) => (
            <TouchableOpacity
              key={piece.id}
              style={styles.card}
              onPress={() => setExpandedId(expandedId === piece.id ? null : piece.id)}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.elementTag, { backgroundColor: ELEMENT_COLORS[piece.element] + "30" }]}>
                  <Text style={[styles.elementTagText, { color: ELEMENT_COLORS[piece.element] }]}>
                    {piece.element}
                  </Text>
                </View>
                <Text style={styles.cardTitle}>{piece.godForm}</Text>
                <Text style={styles.cardSubtitle}>{piece.type}</Text>
              </View>
              {expandedId === piece.id && (
                <View style={styles.expanded}>
                  <Text style={styles.detailLabel}>Attribution</Text>
                  <Text style={styles.detailText}>{piece.attribution}</Text>
                  <Text style={styles.detailLabel}>Upright Meaning</Text>
                  <Text style={styles.detailText}>{piece.divinatoryMeaning.upright}</Text>
                  <Text style={styles.detailLabel}>Modified Meaning</Text>
                  <Text style={styles.detailText}>{piece.divinatoryMeaning.modified}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {tab === "dignities" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Elemental Dignities</Text>
          <Text style={styles.detailText}>
            Fire + Air = Friendly (both active){"\n"}
            Water + Earth = Friendly (both passive){"\n"}
            Fire + Water = Hostile (opposing natures){"\n"}
            Air + Earth = Hostile (opposing natures){"\n"}
            Fire + Earth = Mixed (neutral){"\n"}
            Water + Air = Mixed (neutral)
          </Text>
        </View>
      )}

      {tab === "history" && (
        <View>
          {GOD_FORMS.map((gf) => (
            <View key={gf.id} style={styles.card}>
              <Text style={styles.cardTitle}>{gf.name}</Text>
              <Text style={styles.cardSubtitle}>{gf.attribution}</Text>
              <Text style={styles.detailText}>{gf.symbolism}</Text>
            </View>
          ))}
        </View>
      )}
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
    padding: 10,
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
  },
  cardHeader: { gap: 4 },
  elementTag: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  elementTagText: { fontSize: 10, fontWeight: "700" },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#E5E5E5" },
  cardSubtitle: { fontSize: 12, color: "#A3A3A3" },
  expanded: { marginTop: 12, gap: 6 },
  detailLabel: { fontSize: 12, fontWeight: "700", color: "#D4AF37" },
  detailText: { fontSize: 13, color: "#A3A3A3", lineHeight: 20 },
});
