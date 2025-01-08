import { z } from "zod"

const workspaceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  ownerId: z.string()
})

const createWorkspaceSchema = workspaceSchema.omit({ id: true })

const updateWorkspaceSchema = workspaceSchema.omit({ id: true, ownerId: true })

export type Workspace = z.infer<typeof workspaceSchema>
export type CreateWorkspace = z.infer<typeof createWorkspaceSchema>
export type UpdateWorkspace = z.infer<typeof updateWorkspaceSchema>
