import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Element } from "@enochian-chess/data";

const ELEMENTS = [
  { key: Element.FIRE, label: "Fire", color: "#DC2626", suit: "Wands" },
  { key: Element.WATER, label: "Water", color: "#2563EB", suit: "Cups" },
  { key: Element.AIR, label: "Air", color: "#EAB308", suit: "Swords" },
  { key: Element.EARTH, label: "Earth", color: "#16A34A", suit: "Pentacles" },
];

export default function DivinationTab() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedElement, setSelectedElement] = useState<Element>(Element.WATER);

  const startReading = () => {
    if (!query.trim()) return;
    router.push({
      pathname: "/divination-session",
      params: { query: query.trim(), element: selectedElement },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Divination</Text>
      <Text style={styles.subtitle}>
        Consult the Enochian chess system for guidance through automated readings
      </Text>

      <Text style={styles.label}>Your Question</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="What guidance do you seek?"
        placeholderTextColor="#666"
        multiline
      />

      <Text style={styles.label}>Query Element</Text>
      <Text style={styles.hint}>
        Choose the element that best matches your question's nature
      </Text>
      <View style={styles.elementRow}>
        {ELEMENTS.map((el) => (
          <TouchableOpacity
            key={el.key}
            style={[
              styles.elementChip,
              selectedElement === el.key && { borderColor: el.color, backgroundColor: el.color + "20" },
            ]}
            onPress={() => setSelectedElement(el.key)}
          >
            <View style={[styles.dot, { backgroundColor: el.color }]} />
            <Text style={styles.chipLabel}>{el.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.startButton, !query.trim() && styles.startButtonDisabled]}
        onPress={startReading}
        disabled={!query.trim()}
      >
        <Text style={styles.startButtonText}>Begin Reading</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F0F" },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#D4AF37", marginTop: 12 },
  subtitle: { fontSize: 14, color: "#A3A3A3", marginTop: 8, marginBottom: 24 },
  label: { fontSize: 16, fontWeight: "600", color: "#E5E5E5", marginBottom: 8 },
  hint: { fontSize: 12, color: "#A3A3A3", marginBottom: 12 },
  input: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 14,
    color: "#E5E5E5",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 24,
    minHeight: 80,
    textAlignVertical: "top",
  },
  elementRow: { flexDirection: "row", gap: 8, marginBottom: 32 },
  elementChip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  chipLabel: { fontSize: 13, color: "#E5E5E5", fontWeight: "500" },
  startButton: {
    backgroundColor: "#B8860B",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  startButtonDisabled: { opacity: 0.5 },
  startButtonText: { fontSize: 16, fontWeight: "bold", color: "#000" },
});
