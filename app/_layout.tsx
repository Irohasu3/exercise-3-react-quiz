import { Stack } from "expo-router";
import { QuizProvider } from "../context/QuizContext";

export default function RootLayout() {
  return (
    <QuizProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </QuizProvider>
  );
}