export interface Question {
  id: number;
  prompt: string;
  options: string[];
}

export interface QuizState {
  currentQuestionIndex: number;
  questions: Question[];
  answers: Map<number, number>;
  timeLeft: number;
  setAnswer: (questionId: number, answer: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setTimeLeft: (time: number) => void;
}