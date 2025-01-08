import { z } from "zod"

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
  workspaceId: z.string()
})

export const createProjectSchema = projectScema.omit({
  id: true
})

export type Project = z.infer<typeof projectScema>
export type CreateProject = z.infer<typeof createProjectSchema>
