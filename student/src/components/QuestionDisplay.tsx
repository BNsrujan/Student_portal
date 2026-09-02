import React from 'react';
import { useQuizStore } from '../store/quizStore';
import Timer from './Timer';

const QuestionDisplay: React.FC = () => {
  const { questions, currentQuestionIndex, answers, setAnswer, nextQuestion } = useQuizStore();
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers.get(currentQuestion.id);

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswer(currentQuestion.id, optionIndex);
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Question {currentQuestionIndex + 1}</h2>
          <Timer />
        </div>
        
        <div className="mb-8">
          <p className="text-xl mb-6">{currentQuestion.prompt}</p>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  selectedAnswer === index
                    ? 'bg-blue-100 border-blue-400'
                    : 'bg-gray-50 hover:bg-gray-100'
                } border-2`}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;