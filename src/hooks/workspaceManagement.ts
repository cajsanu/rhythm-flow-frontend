import { Workspace } from "@/types/workspace"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import workspaceRequests from "@/api/workspaces"
import { User } from "@/types/user"
import { Role } from "@/types/role"

export const useGetWorkspaces = (id: string) => {
  const { data, isLoading, error } = useQuery<Workspace[]>({
    queryKey: ["workspaces", id],
    queryFn: () => workspaceRequests.getMyWorkspaces(id)
  })
  return { data, isLoading, error }
}

export const useGetUsersInWorkspace = (id: string) => {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users", id],
    queryFn: () => workspaceRequests.getUsersInWorkspace(id)
  })
  return { data, isLoading, error }
}

export const useGetWorkspaceById = (id: string) => {
  const { data, isLoading, error } = useQuery<Workspace>({
    queryKey: ["workspace", id],
    queryFn: () => workspaceRequests.getWorkspaceById(id)
  })
  return { data, isLoading, error }
}

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient()

  const newWorkspaceMutation = useMutation({
    mutationFn: workspaceRequests.createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    }
  })

  return newWorkspaceMutation
}

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient()

  const deleteWorkspaceMutation = useMutation({
    mutationFn: workspaceRequests.deleteWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    }
  })

  return deleteWorkspaceMutation
}

export const useAddUserToWorkspace = () => {
  const queryClient = useQueryClient()

  const assignUserMutation = useMutation({
    mutationFn: ({
      workspaceId,
      userId,
      role
    }: {
      workspaceId: string
      userId: string
      role: Role
    }) => {
      return workspaceRequests.addUserToWorkspace(workspaceId, userId, role)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })

  return assignUserMutation
}

export const useGetUserRoleInworkspace = (workspaceId: string, userId: string) => {
  const { data, isLoading, error } = useQuery<Role>({
    queryKey: ["userworkspace", userId],
    queryFn: () => workspaceRequests.getUserRoleInWorkspace(workspaceId, userId)
  })
  return { data, isLoading, error }
}
