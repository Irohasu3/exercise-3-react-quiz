import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { questions as defaultQuestions } from "../questions";

type Question = typeof defaultQuestions[0];

type QuizContextType = {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
};

export const QuizContext = createContext<QuizContextType>(
  {} as QuizContextType
);

const QUESTIONS_KEY = "QUIZ_QUESTIONS";
const TIMER_KEY = "QUIZ_TIMER";

export function QuizProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] =
    useState<Question[]>(defaultQuestions);
  const [timer, setTimer] = useState<number>(60);

  
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedQuestions = await AsyncStorage.getItem(QUESTIONS_KEY);
        const savedTimer = await AsyncStorage.getItem(TIMER_KEY);

        if (savedQuestions) {
          setQuestions(JSON.parse(savedQuestions));
        }

        if (savedTimer) {
          setTimer(Number(savedTimer));
        }
      } catch (error) {
        console.log("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  
  useEffect(() => {
    const saveQuestions = async () => {
      try {
        await AsyncStorage.setItem(
          QUESTIONS_KEY,
          JSON.stringify(questions)
        );
      } catch (error) {
        console.log("Error saving questions:", error);
      }
    };

    saveQuestions();
  }, [questions]);

  
  useEffect(() => {
    const saveTimer = async () => {
      try {
        await AsyncStorage.setItem(TIMER_KEY, timer.toString());
      } catch (error) {
        console.log("Error saving timer:", error);
      }
    };

    saveTimer();
  }, [timer]);

  return (
    <QuizContext.Provider
      value={{ questions, setQuestions, timer, setTimer }}
    >
      {children}
    </QuizContext.Provider>
  );
}