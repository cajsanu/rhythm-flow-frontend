import { z } from "zod"
import { userSchema } from "./user"

const projectScema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  startDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Start date must be a valid date"
  }),
  endDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "End date must be a valid date"
  }),
  status: z.number().min(0, { message: "Status is required" }),
  workspaceId: z.string(),
  users: z.array(userSchema).optional()
})

export const createProjectSchema = projectScema
  .omit({
    id: true
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate)
      const now = new Date()
      return startDate >= now
    },
    { message: "Start date cannot be in the past" }
  )
  .refine(
    (data) => {
      const startDate = new Date(data.startDate)
      const endDate = new Date(data.endDate)
      return endDate > startDate
    },
    { message: "End date must be after start date", path: ["endDate"] }
  )

export const updateProjectSchema = projectScema

export type Project = z.infer<typeof projectScema>
export type CreateProject = z.infer<typeof createProjectSchema>
export type UpdateProject = z.infer<typeof updateProjectSchema>
