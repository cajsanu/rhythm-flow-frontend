import { Workspace } from "@/types/workspace"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import workspaceRequests from "@/api/workspaces"
import { User } from "@/types/user"

export const useGetWorkspaces = (id: string) => {
  const { data, isLoading, error } = useQuery<Workspace[]>({
    queryKey: ["workspaces", id],
    queryFn: () => workspaceRequests.getMyWorkspaces(id),
  })
  return { data, isLoading, error }
}

export const useGetUsersInWorkspace = (id: string) => {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users", id],
    queryFn: () => workspaceRequests.getUsersInWorkspace(id),
  })
  return { data, isLoading, error }
}

export const useGetWorkspaceById = (id: string) => {
  const { data, isLoading, error } = useQuery<Workspace>({
    queryKey: ["workspace", id],
    queryFn: () => workspaceRequests.getWorkspaceById(id),
    throwOnError: true,
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
