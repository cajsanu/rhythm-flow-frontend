import { SignupForm } from "@/components/ui"


export const Signup = () => {

  return (
    <div className="flex justify-center bg-rose-300 h-screen">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white py-2">
          Sign up to start managing your tasks more efficiently!
        </h2>
        <SignupForm />
      </div>
    </div>
  )
}
