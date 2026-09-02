import { useQuizStore } from "../store/quizStore";
import ThemeToggle from "./ThemeToggle";

const QuizNavbar: React.FC = () => {
  const { questions, answers } = useQuizStore();
  const progress = (answers.size / questions.length) * 100;

  return (
    <nav className="sticky top-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Alvas_Quize
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="progress-bar bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {answers.size}/{questions.length} Completed
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default QuizNavbar;
