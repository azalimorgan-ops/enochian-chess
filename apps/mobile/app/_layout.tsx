import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0F0F0F" },
          headerTintColor: "#D4AF37",
          headerTitleStyle: { fontWeight: "bold" },
          contentStyle: { backgroundColor: "#0F0F0F" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{ title: "Game", headerBackTitle: "Back" }} />
        <Stack.Screen name="divination-session" options={{ title: "Reading", headerBackTitle: "Back" }} />
      </Stack>
    </>
  );
}
