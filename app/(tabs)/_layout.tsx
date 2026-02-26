// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { QuizProvider } from "../../context/QuizContext";

export default function TabLayout() {
  return (
    <QuizProvider>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: "#4c8bf5",
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        }}
      >
        <Tabs.Screen
          name="preview"
          options={{ title: "Preview Quiz" }}
        />
        <Tabs.Screen
          name="settings"
          options={{ title: "Quiz Settings" }}
        />
      </Tabs>
    </QuizProvider>
  );
}