import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/api/login"
import { useNavigate } from "react-router-dom"
import userRequests from "../api/users"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

const schema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z.string().min(10, { message: "Password must be at least 10 characters" })
})

type LoginFields = z.infer<typeof schema>

export const LoginForm = () => {
  const form = useForm<LoginFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginFields> = async (data: LoginFields) => {
    try {
      const token = await login(data)
      window.localStorage.clear()
      token && window.localStorage.setItem("token", token)
      const user = await userRequests.getUserByEmail(data.email)
      if (!user) {
        throw new Error("User not found")
      }
      navigate(`/home/${user.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">
              Log in
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
