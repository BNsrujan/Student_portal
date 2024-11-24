import React, { useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';

const Timer: React.FC = () => {
  const { timeLeft, setTimeLeft, nextQuestion } = useQuizStore();
  const isWarning = timeLeft <= 30;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(Math.max(0, timeLeft - 1));
    }, 1000);

    if (timeLeft === 0) {
      nextQuestion();
    }

    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft, nextQuestion]);

  return (
    <div className={`px-4 py-2 rounded-lg ${
      isWarning 
        ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 timer-warning' 
        : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    } font-mono text-lg transition-colors duration-300`}>
      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
    </div>
  );
};

export default Timer;