import { Tabs } from "expo-router";
import { Text } from "react-native";

function TabIcon({ icon, color }: { icon: string; color: string }) {
  return <Text style={{ fontSize: 22, color }}>{icon}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#D4AF37",
        tabBarInactiveTintColor: "#A3A3A3",
        tabBarStyle: {
          backgroundColor: "#1A1A1A",
          borderTopColor: "#333333",
        },
        headerStyle: { backgroundColor: "#0F0F0F" },
        headerTintColor: "#D4AF37",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Game",
          tabBarIcon: ({ color }) => <TabIcon icon="♔" color={color} />,
        }}
      />
      <Tabs.Screen
        name="divination"
        options={{
          title: "Divination",
          tabBarIcon: ({ color }) => <TabIcon icon="☽" color={color} />,
        }}
      />
      <Tabs.Screen
        name="encyclopedia"
        options={{
          title: "Encyclopedia",
          tabBarIcon: ({ color }) => <TabIcon icon="📖" color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ color }) => <TabIcon icon="⚡" color={color} />,
        }}
      />
    </Tabs>
  );
}
