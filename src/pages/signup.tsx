import { SignupForm } from "@/components"
import { Alerts } from "@/components/alert"

export const Signup = () => {
  return (
    <div className="flex justify-center bg-rose-400 h-screen">
      <div>
        <Alerts />
        <h2 className="text-2xl font-bold tracking-tight text-white py-2">
          Sign up to start managing your tasks more efficiently!
        </h2>
        <SignupForm />
      </div>
    </div>
  )
}
