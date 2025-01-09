import { useForm, SubmitHandler } from "react-hook-form"
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
import { LoginCredentials, loginSchema } from "@/types/user"

export const LoginForm = () => {
  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginCredentials> = async (data: LoginCredentials) => {
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
    <Card className="w-full mx-auto mt-10">
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
