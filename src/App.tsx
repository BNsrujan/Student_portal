import Login from "./app/(auth)/login"
import { createRoot } from "react-dom/client"
import { useEffect } from "react"
import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider
} from "react-router-dom"
import SignUp from "./app/(auth)/signup"
import { useThemeStore } from "@/store/themeStore"
import QuizNavbar from "@/components/Navbar"
import Question from "@/components/Question"
import QuestionList from "@/components/QuestionList"
import Dashboard from "./app/Home"


function App() {
  const { isDark } = useThemeStore()
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const router = createBrowserRouter([
    {
      path: '/Login',
      element: <Login />
    },
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: "/quiz",
      element: <div>
        <QuizNavbar />
        <div className="flex">
          <QuestionList />
          <Question />
        </div>
      </div>
    }
  ])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      <RouterProvider router={router} />
    </div>
  )
}

export default App
