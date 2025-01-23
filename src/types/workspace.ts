import { z } from "zod"

const workspaceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  ownerId: z.string()
})

export const createWorkspaceSchema = workspaceSchema.omit({ id: true })

const updateWorkspaceSchema = workspaceSchema.omit({ id: true, ownerId: true })

export const userWorkspaceSchema = z.object({
  userId: z.string(),
  workspaceId: z.string(),
  role: z.number().min(0).max(2)
})

export type Workspace = z.infer<typeof workspaceSchema>
export type CreateWorkspace = z.infer<typeof createWorkspaceSchema>
export type UpdateWorkspace = z.infer<typeof updateWorkspaceSchema>
export type UserWorkspace = z.infer<typeof userWorkspaceSchema>
