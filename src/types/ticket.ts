import { z } from "zod"

const ticketSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  priority: z.number().min(1, { message: "Priority is required" }),
  deadline: z.string().min(1, { message: "Deadline is required" }),
  status: z.number().min(1, { message: "Status is required" }),
  projectId: z.string().min(1, { message: "Project ID is required" }),
  type: z.number().min(1, { message: "Type is required" }),
  userIds: z.array(z.string()).optional()
})

export type Ticket = z.infer<typeof ticketSchema>
