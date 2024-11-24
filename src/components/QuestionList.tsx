import React from 'react';
import { useQuizStore } from '../store/quizStore';

const QuestionList: React.FC = () => {
  const { questions, answers, currentQuestionIndex } = useQuizStore();

  return (
    <div className="w-72 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Questions Overview
      </h2>
      <div className="space-y-3">
        {questions.map((question, index) => {
          const isAnswered = answers.has(question.id);
          const isCurrent = index === currentQuestionIndex;
          
          return (
            <div
              key={question.id}
              className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-102 ${
                isAnswered 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-700' 
                  : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600'
              } ${
                isCurrent 
                  ? 'ring-2 ring-blue-400 dark:ring-blue-500 shadow-lg scale-105' 
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  isAnswered 
                    ? 'bg-green-400 dark:bg-green-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}>
                  {index + 1}
                </span>
                <span className={`text-sm font-medium ${
                  isAnswered ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  Question {index + 1}
                  {isAnswered && (
                    <span className="ml-2 text-green-500 dark:text-green-400">✓</span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionList;