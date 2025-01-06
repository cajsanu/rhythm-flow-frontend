import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import userRequests from "../../api/users"
import { useNavigate } from "react-router-dom"
import { CreateUser } from "@/types/user"

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z.string().min(10)
})

type SignupFields = z.infer<typeof schema>

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFields>({ resolver: zodResolver(schema) })
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<SignupFields> = async (data: CreateUser) => {
    try {
      const user = await userRequests.createUser(data)
      console.log("USER", user)
      navigate("/home")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium leading-6 text-white flex justify-right pt-2">
            First Name:
          </label>
          <input
            type="text"
            {...register("firstName")}
            className="block w-full rounded-md py-1.5 text-black outline outline-transparent focus:outline-pink-800"
          />
          {errors.firstName && (
            <div className="p-2">
              <p className="text-black">{errors.firstName.message}</p>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-white flex justify-right pt-2">
            Last Name:
          </label>
          <input
            type="text"
            {...register("lastName")}
            className="block w-full rounded-md py-1.5 text-black outline outline-transparent focus:outline-pink-800"
          />
          {errors.lastName && (
            <div className="p-2">
              <p className="text-black">{errors.lastName.message}</p>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-white flex justify-right pt-2">
            Email:
          </label>
          <input
            type="text"
            {...register("email")}
            className="block w-full rounded-md py-1.5 text-black outline outline-transparent focus:outline-pink-800"
          />
          {errors.email && (
            <div className="p-2">
              <p className="text-black">{errors.email.message}</p>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-white flex justify-right pt-2">
            Password:
          </label>
          <input
            type="password"
            {...register("password")}
            className="block w-full rounded-md py-1.5 text-black outline outline-transparent focus:outline-pink-800"
          />
          {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        </div>
        <div className="py-3">
          <button
            className="transition delay-150 flex w-full justify-center rounded-md bg-rose-300 px-3 py-1.5 text-sm font-semibold leading-6 text-rose-800 hover:bg-rose-200"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}
