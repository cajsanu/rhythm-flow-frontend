import { LoginForm } from "@/components"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-sky-800 via-black to-sky-800">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Welcome to <span className="text-sky-600">RhythmFlow</span>
        </h2>
        <p className="text-gray-600 text-center mb-8">If you have an account, sign in here!</p>
        <LoginForm />
        <div className="pt-6 text-center">
          <p className="text-gray-600 mb-3">Don't have an account?</p>
          <Button
            className="w-5/6 bg-sky-700 hover:bg-sky-600 text-white"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}
