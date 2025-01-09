import { LoginForm } from "@/components"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center bg-gradient-to-r from-sky-400 to-rose-400 h-screen">
      <div>
        <h2 className="text-4xl font-bold text-white pt-10">
          Welcome to <span className="text-gray-900">RhythmFlow</span>
        </h2>
        <LoginForm />
        <div className="pt-4">
          <p className="text-white font-semibold pb-1">Don't have an account?</p>
          <Button className="w-full" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  )
}
