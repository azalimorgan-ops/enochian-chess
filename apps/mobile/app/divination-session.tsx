import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Element } from "@enochian-chess/data";
import { generateAutomatedReading } from "@enochian-chess/engine";
import type { DivinationReading } from "@enochian-chess/engine";

const ELEMENT_COLORS: Record<string, string> = {
  FIRE: "#DC2626",
  WATER: "#2563EB",
  AIR: "#EAB308",
  EARTH: "#16A34A",
};

export default function DivinationSession() {
  const { query, element } = useLocalSearchParams<{ query: string; element: string }>();
  const [reading, setReading] = useState<DivinationReading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = (element as Element) || Element.WATER;
    const result = generateAutomatedReading(query || "General guidance", el);
    setReading(result);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D4AF37" />
        <Text style={styles.loadingText}>Consulting the Watchtowers...</Text>
      </View>
    );
  }

  if (!reading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Failed to generate reading</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Query */}
      <View style={styles.queryCard}>
        <Text style={styles.queryLabel}>Your Question</Text>
        <Text style={styles.queryText}>{reading.query}</Text>
        <View style={[styles.elementTag, { backgroundColor: ELEMENT_COLORS[reading.queryElement] + "30" }]}>
          <Text style={[styles.elementTagText, { color: ELEMENT_COLORS[reading.queryElement] }]}>
            {reading.queryElement}
          </Text>
        </View>
      </View>

      {/* Summary */}
      <Text style={styles.sectionTitle}>Summary</Text>
      <View style={styles.card}>
        <Text style={styles.summaryText}>{reading.summary}</Text>
      </View>

      {/* Piece Readings */}
      <Text style={styles.sectionTitle}>Piece Readings</Text>
      {reading.pieceReadings.map((pr, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.readingHeader}>
            <Text style={[styles.godForm, { color: ELEMENT_COLORS[pr.element] }]}>{pr.godForm}</Text>
            <Text style={styles.pieceType}>{pr.pieceType}</Text>
          </View>
          <Text style={styles.readingMeaning}>{pr.meaning}</Text>
          <Text style={styles.readingSquare}>
            Square: {pr.squareMeaning}
          </Text>
          {pr.dignityModifier && (
            <Text style={styles.dignityMod}>Dignity: {pr.dignityModifier}</Text>
          )}
        </View>
      ))}

      {/* Dignity Interactions */}
      {reading.dignityInteractions.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Elemental Interactions</Text>
          {reading.dignityInteractions.map((di, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.interactionPieces}>
                {di.piece1} + {di.piece2}
              </Text>
              <Text style={[
                styles.interactionRelation,
                {
                  color:
                    di.relation === "FRIENDLY" ? "#4ADE80" :
                    di.relation === "HOSTILE" ? "#F87171" : "#FBBF24",
                },
              ]}>
                {di.relation}
              </Text>
              <Text style={styles.interactionMeaning}>{di.meaning}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F0F" },
  content: { padding: 20, paddingBottom: 40 },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: { color: "#A3A3A3", fontSize: 16 },
  queryCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D4AF37",
    marginBottom: 20,
  },
  queryLabel: { fontSize: 12, color: "#D4AF37", fontWeight: "700", marginBottom: 6 },
  queryText: { fontSize: 16, color: "#E5E5E5", lineHeight: 22 },
  elementTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 10,
  },
  elementTagText: { fontSize: 11, fontWeight: "700" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#D4AF37",
    marginBottom: 10,
    marginTop: 8,
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  summaryText: { fontSize: 15, color: "#E5E5E5", lineHeight: 22 },
  readingHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  godForm: { fontSize: 15, fontWeight: "bold" },
  pieceType: { fontSize: 12, color: "#A3A3A3" },
  readingMeaning: { fontSize: 13, color: "#E5E5E5", lineHeight: 20, marginBottom: 6 },
  readingSquare: { fontSize: 12, color: "#A3A3A3" },
  dignityMod: { fontSize: 12, color: "#D4AF37", marginTop: 4 },
  interactionPieces: { fontSize: 14, fontWeight: "600", color: "#E5E5E5" },
  interactionRelation: { fontSize: 12, fontWeight: "bold", marginTop: 4 },
  interactionMeaning: { fontSize: 13, color: "#A3A3A3", marginTop: 4, lineHeight: 20 },
});
