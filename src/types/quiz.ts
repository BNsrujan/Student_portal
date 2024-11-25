export interface Question {
  id: string;
  prompt: string;
  options: string[];
  type: 'multiple-choice' | 'checkbox' | 'short-answer' | 'paragraph';
  required: boolean;
}

export interface QuizState {
  currentQuestionIndex: number;
  questions: Question[];
  answers: Map<string, number>;
  timeLeft: number;
  setAnswer: (questionId: string, answer: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setTimeLeft: (time: number) => void;
}