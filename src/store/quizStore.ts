import { create } from 'zustand';
import { Question, QuizState } from '@/types/quiz';

const sampleQuestions: Question[] = [
  {
    id: 1,
    prompt: "Which of the following is a correct syntax to declare a pointer in C?",
    options: ["int ptr;", "int *ptr;", "ptr int;", "*int ptr;"]
  },
  {
    id: 2,
    prompt: "What is the output of the expression (5 / 2) in C?",
    options: ["2.5", "2", "5", "Error"]
  },
  {
    id: 3,
    prompt: "Which keyword is used to prevent a variable from being modified in C?",
    options: ["static", "volatile", "const", "register"]
  }
];


export const useQuizStore = create<QuizState>((set) => ({
  currentQuestionIndex: 0,
  questions: sampleQuestions,
  answers: new Map(),
  timeLeft: 120,

  setAnswer: (questionId: number, answer: number) =>
    set((state) => {
      const newAnswers = new Map(state.answers);
      newAnswers.set(questionId, answer);
      return { answers: newAnswers };
    }),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
      timeLeft: 120
    })),

  previousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      timeLeft: 120
    })),

  setTimeLeft: (time: number) =>
    set({ timeLeft: time })
}));