import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Element } from "@enochian-chess/data";

const ELEMENTS = [
  { key: Element.FIRE, label: "Fire", color: "#DC2626", desc: "Wands — Will & Action" },
  { key: Element.WATER, label: "Water", color: "#2563EB", desc: "Cups — Emotion & Intuition" },
  { key: Element.AIR, label: "Air", color: "#EAB308", desc: "Swords — Intellect & Conflict" },
  { key: Element.EARTH, label: "Earth", color: "#16A34A", desc: "Pentacles — Material & Stability" },
];

const MODES = [
  { key: "solo", label: "Solo vs AI", desc: "Play against three AI opponents" },
  { key: "pass", label: "Pass & Play", desc: "Four players share one device" },
];

export default function GameTab() {
  const router = useRouter();
  const [selectedElement, setSelectedElement] = useState<Element>(Element.FIRE);
  const [selectedMode, setSelectedMode] = useState("solo");

  const startGame = () => {
    router.push({
      pathname: "/game",
      params: { element: selectedElement, mode: selectedMode },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Enochian Chess</Text>
      <Text style={styles.subtitle}>
        The Golden Dawn's four-player chess variant & divination system
      </Text>

      <Text style={styles.sectionTitle}>Choose Your Element</Text>
      <View style={styles.grid}>
        {ELEMENTS.map((el) => (
          <TouchableOpacity
            key={el.key}
            style={[
              styles.elementCard,
              selectedElement === el.key && { borderColor: el.color },
            ]}
            onPress={() => setSelectedElement(el.key)}
          >
            <View style={[styles.elementDot, { backgroundColor: el.color }]} />
            <Text style={styles.elementLabel}>{el.label}</Text>
            <Text style={styles.elementDesc}>{el.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Game Mode</Text>
      {MODES.map((mode) => (
        <TouchableOpacity
          key={mode.key}
          style={[
            styles.modeCard,
            selectedMode === mode.key && styles.modeCardActive,
          ]}
          onPress={() => setSelectedMode(mode.key)}
        >
          <Text style={styles.modeLabel}>{mode.label}</Text>
          <Text style={styles.modeDesc}>{mode.desc}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.startButton} onPress={startGame}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F0F" },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#D4AF37",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#A3A3A3",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E5E5E5",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  elementCard: {
    width: "48%",
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 14,
    borderWidth: 2,
    borderColor: "#333333",
  },
  elementDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  elementLabel: { fontSize: 16, fontWeight: "600", color: "#E5E5E5" },
  elementDesc: { fontSize: 11, color: "#A3A3A3", marginTop: 4 },
  modeCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333333",
  },
  modeCardActive: { borderColor: "#D4AF37" },
  modeLabel: { fontSize: 16, fontWeight: "600", color: "#E5E5E5" },
  modeDesc: { fontSize: 12, color: "#A3A3A3", marginTop: 4 },
  startButton: {
    backgroundColor: "#B8860B",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonText: { fontSize: 18, fontWeight: "bold", color: "#000" },
});
