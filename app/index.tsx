import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Quiz App</Text>

      <View style={styles.buttonWrapper}>
        <Button
          title="Start Quiz"
          onPress={() => router.push("/(tabs)/preview")}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Quiz Settings"
          onPress={() => router.push("/(tabs)/settings")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  title: { fontSize: 22, marginBottom: 30, textAlign: "center" },
  buttonWrapper: { width: 200, marginVertical: 10 }, // narrower buttons
});