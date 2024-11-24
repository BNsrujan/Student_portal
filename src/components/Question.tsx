import React from 'react';
import { useQuizStore } from '../store/quizStore';
import Timer from './Timer';

const Question: React.FC = () => {
  const { questions, currentQuestionIndex, answers, setAnswer, nextQuestion } = useQuizStore();
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers.get(currentQuestion.id);

  return (
    <div className="flex-1 p-8 overflow-hidden">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-8 question-transition transition-colors duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Question {currentQuestionIndex + 1}
          </h2>
          <Timer />
        </div>
        
        <div className="mb-8 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
          <p className="text-xl text-gray-800 dark:text-gray-200 font-medium">{currentQuestion.prompt}</p>
        </div>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setAnswer(currentQuestion.id, index)}
              className={`w-full p-5 text-left rounded-xl transition-all duration-300 option-hover ${
                selectedAnswer === index
                  ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-2 border-blue-300 dark:border-blue-700 shadow-md'
                  : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  selectedAnswer === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg dark:text-gray-200">{option}</span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={nextQuestion}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl
              hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300
              shadow-md hover:shadow-lg"
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;