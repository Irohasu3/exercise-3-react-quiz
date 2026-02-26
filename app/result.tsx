import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResultScreen() {
  const { score } = useLocalSearchParams<{ score: string }>();
  const currentScore = Number(score ?? 0);

  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem("HIGH_SCORE");
      const parsedHighScore = savedHighScore ? Number(savedHighScore) : 0;

      const newHighScore = Math.max(parsedHighScore, currentScore);
      setHighScore(newHighScore);

      if (currentScore > parsedHighScore) {
        await AsyncStorage.setItem("HIGH_SCORE", currentScore.toString());
      }
    } catch (error) {
      console.log("Error loading high score:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed</Text>

      <Text style={styles.score}>Your Score: {currentScore}</Text>
      <Text style={styles.highScore}>Highest Score: {highScore}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    marginBottom: 10,
  },
  highScore: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4c8bf5",
  },
  button: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});