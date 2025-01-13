import { z } from "zod"

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please provide a valid email" })
})

export const loginSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z.string().min(10, { message: "Password must be at least 10 characters" })
})

export const createUserSchema = userSchema.omit({ id: true }).extend({
  password: z.string().min(10, { message: "Password must be at least 10 characters" })
})

const updateUserSchema = userSchema.omit({ id: true })

export type User = z.infer<typeof userSchema>
export type LoginCredentials = z.infer<typeof loginSchema>
export type CreateUser = z.infer<typeof createUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>
