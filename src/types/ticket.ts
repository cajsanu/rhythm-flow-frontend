import { z } from "zod"
import { userSchema } from "./user"

const ticketSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  priority: z.number().min(0, { message: "Priority is required" }),
  deadline: z
    .string()
    .min(1, { message: "Deadline is required" })
    .refine(
      (date) => {
        const deadlineDate = new Date(date)
        const now = new Date()
        return deadlineDate >= now
      },
      { message: "Deadline cannot be in the past" }
    ),
  status: z.number().min(0, { message: "Status is required" }),
  projectId: z.string().min(1, { message: "Project ID is required" }),
  type: z.number().min(0, { message: "Type is required" }),
  users: z.array(userSchema).optional()
})

export const createTicketSchema = ticketSchema.omit({
  id: true
})

const updateTicketSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  priority: z.number().optional(),
  deadline: z.string().optional(),
  status: z.number().optional(),
  projectId: z.string(),
  type: z.number().optional(),
  users: z.array(userSchema).optional()
})

export type Ticket = z.infer<typeof ticketSchema>
export type CreateTicket = z.infer<typeof createTicketSchema>
export type UpdateTicket = z.infer<typeof updateTicketSchema>
