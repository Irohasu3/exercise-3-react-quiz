import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { questions } from "../questions";

export default function QuizScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = userAnswers[currentQuestion.id];

  const handleAnswer = (choice: string) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: choice,
    });
  };

  const calculateScore = () => {
    let score = 0;

    questions.forEach((q) => {
      if (userAnswers[q.id] === q.answer) {
        score++;
      }
    });

    router.push({
      pathname: "/result",
      params: { score },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Progress */}
      <Text style={styles.progress}>
        Question {currentIndex + 1} of {questions.length}
      </Text>

      {/* Question */}
      <Text style={styles.question}>
        {currentQuestion.question}
      </Text>

      {/* Choices */}
      {Object.entries(currentQuestion.choices).map(
        ([key, value]) => {
          const isSelected = selectedAnswer === key;

          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.choiceButton,
                isSelected && styles.selectedChoice,
              ]}
              onPress={() => handleAnswer(key)}
            >
              <Text
                style={[
                  styles.choiceText,
                  isSelected && styles.selectedText,
                ]}
              >
                {key}. {value}
              </Text>
            </TouchableOpacity>
          );
        }
      )}

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        {currentIndex > 0 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentIndex(currentIndex - 1)}
          >
            <Text style={styles.navText}>Previous</Text>
          </TouchableOpacity>
        )}

        {currentIndex < questions.length - 1 ? (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentIndex(currentIndex + 1)}
          >
            <Text style={styles.navText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navButton, styles.finishButton]}
            onPress={calculateScore}
          >
            <Text style={styles.navText}>Finish Quiz</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f7fa",
  },
  progress: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  choiceButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  selectedChoice: {
    backgroundColor: "#4c8bf5",
    borderColor: "#4c8bf5",
  },
  choiceText: {
    fontSize: 16,
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
  navigation: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navButton: {
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  finishButton: {
    backgroundColor: "#28a745",
  },
  navText: {
    color: "#fff",
    fontWeight: "bold",
  },
});