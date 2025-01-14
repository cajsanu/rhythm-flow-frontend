import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { useLogin } from "@/hooks/userManagement"
import { useAppDispatch } from "@/hooks/alertManagement"
import { timedAlert } from "@/reducers/alertSlice"
import { Alerts } from "./alert"

export const LoginForm = () => {
  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const dispatch = useAppDispatch()

  const loginMutation = useLogin()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginCredentials> = async (data: LoginCredentials) => {
    try {
      await loginMutation.mutateAsync(data)
      const user = await userRequests.getUserByEmail(data.email)
      if (!user) {
        throw new Error("User not found")
      }
      dispatch(
        timedAlert({
          message: `Welcome back, ${user.firstName}`,
          severity: "success"
        })
      )
      navigate(`/home/${user.id}`)
    } catch (err) {
      dispatch(
        timedAlert({
          message: "Invalid email or password",
          severity: "error"
        })
      )
    }
  }

  return (
    <Card className="w-full mx-auto mt-10">
      <CardHeader>
        <Alerts />
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
