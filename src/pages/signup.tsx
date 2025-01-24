import { SignupForm } from "@/components"
import { Alerts } from "@/components/alert"

export const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-800 via-black to-sky-800">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md m-5">
        <Alerts />
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Welcome to <span className="text-sky-600">RhythmFlow</span>
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Sign up to start managing your tasks more efficiently!
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

