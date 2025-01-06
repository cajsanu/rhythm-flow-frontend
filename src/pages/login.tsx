import { LoginForm } from "@/components/ui"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center bg-rose-300 h-screen">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white py-2">
          Sign in to your account
        </h2>
        <LoginForm />
        <div className="py-3">
          <p className="text-white">Don't have an account?</p>
          <button
            className="transition delay-150 flex w-full justify-center rounded-md bg-rose-300 px-3 py-1.5 text-sm font-semibold leading-6 text-rose-800 hover:bg-rose-200"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}
