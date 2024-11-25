import React from 'react';
import { useQuizStore } from '../store/quizStore';
import Timer from './Timer';
import { cn } from '@/lib/utils';

const Question: React.FC = () => {
  const { questions, currentQuestionIndex, answers, setAnswer, nextQuestion } = useQuizStore();
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers.get(currentQuestion.id);

  const handleAnswerSelect = (index: number) => {
    setAnswer(currentQuestion.id, index);
  };

  return (
    <div className="flex-1 p-8 overflow-hidden">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Question {currentQuestionIndex + 1}
          </h2>
          <Timer />
        </div>

        <div className="mb-8">
          <p className="text-xl text-gray-800 dark:text-gray-200">{currentQuestion.prompt}</p>
        </div>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={cn(
                "w-full p-4 text-left rounded-xl transition-all",
                selectedAnswer === index
                  ? "bg-blue-100 dark:bg-blue-900/30 border-blue-500"
                  : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50",
                "border-2"
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-full",
                  selectedAnswer === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-900 dark:text-gray-100">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;