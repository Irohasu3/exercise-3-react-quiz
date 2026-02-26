import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { QuizContext } from "../../context/QuizContext";

type QuestionType = "multiple" | "truefalse" | "checkbox";

type Question = {
  id: number;
  type: QuestionType;
  question: string;
  choices: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
};

export default function SettingsScreen() {
  const { questions, setQuestions, timer, setTimer } =
    useContext(QuizContext);

  const [localQuestions, setLocalQuestions] = useState<Question[]>(
    [...questions] as Question[]
  );

  // ✅ Keep local state synced with context
  useEffect(() => {
    setLocalQuestions([...questions] as Question[]);
  }, [questions]);

  const handleQuestionChange = (
    index: number,
    key: keyof Question,
    value: string
  ) => {
    const updated = [...localQuestions];
    (updated[index][key] as any) = value;
    setLocalQuestions(updated);
  };

  const handleChoiceChange = (
    index: number,
    choiceKey: keyof Question["choices"],
    value: string
  ) => {
    const updated = [...localQuestions];
    updated[index].choices[choiceKey] = value;
    setLocalQuestions(updated);
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: localQuestions.length + 1,
      type: "multiple",
      question: "New Question",
      choices: { A: "", B: "", C: "", D: "" },
      answer: "A",
    };

    setLocalQuestions([...localQuestions, newQuestion]);
  };

  // ✅ FIXED: Reindex IDs after delete
  const deleteQuestion = (index: number) => {
    const updated = localQuestions.filter((_, i) => i !== index);

    const reindexed = updated.map((q, i) => ({
      ...q,
      id: i + 1,
    }));

    setLocalQuestions(reindexed);
  };

  const saveChanges = () => {
    setQuestions(localQuestions as any);
    Alert.alert("Success", "Questions saved!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quiz Timer (seconds)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={timer.toString()}
        onChangeText={(text) => setTimer(Number(text) || 0)}
      />

      <Text style={[styles.title, { marginTop: 20 }]}>
        Edit Questions
      </Text>

      {localQuestions.map((q, index) => (
        <View key={q.id} style={styles.questionCard}>
          <Text style={styles.label}>Question {index + 1}</Text>

          <TextInput
            style={styles.input}
            value={q.question}
            onChangeText={(text) =>
              handleQuestionChange(index, "question", text)
            }
          />

          {Object.entries(q.choices).map(([key, value]) => (
            <View key={key} style={styles.choiceRow}>
              <Text style={styles.choiceLabel}>{key}:</Text>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={value}
                onChangeText={(text) =>
                  handleChoiceChange(
                    index,
                    key as keyof Question["choices"],
                    text
                  )
                }
              />
            </View>
          ))}

          <Text style={styles.label}>Correct Answer</Text>
          <TextInput
            style={styles.input}
            value={q.answer}
            onChangeText={(text) =>
              handleQuestionChange(index, "answer", text)
            }
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#dc3545" }]}
            onPress={() => deleteQuestion(index)}
          >
            <Text style={styles.buttonText}>Delete Question</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4c8bf5" }]}
        onPress={addQuestion}
      >
        <Text style={styles.buttonText}>Add Question</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#28a745" }]}
        onPress={saveChanges}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  questionCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  choiceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  choiceLabel: {
    marginRight: 8,
    fontWeight: "bold",
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});