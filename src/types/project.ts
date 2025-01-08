import { z } from "zod"

const projectScema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  workspaceId: z.string()
})

export type Project = z.infer<typeof projectScema>
