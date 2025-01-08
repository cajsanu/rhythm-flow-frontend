import { z } from "zod"

const projectScema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  status: z.number().min(0, { message: "Status is required" }),
  workspaceId: z.string()
})

export const createProjectSchema = projectScema.omit({
  id: true
})

export type Project = z.infer<typeof projectScema>
export type CreateProject = z.infer<typeof createProjectSchema>
