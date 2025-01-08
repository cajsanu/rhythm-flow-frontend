import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import projectRequests from "@/api/projects"
import { Project } from "@/types/project"

export const useGetProjectsInWorkspace = (id: string) => {
  const { data, isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects", id],
    queryFn: () => projectRequests.getProjectsInWorkspace(id)
  })
  return { data, isLoading, error }
}

export const useGetProjectById = (id: string, wsId: string) => {
  const { data, isLoading, error } = useQuery<Project>({
    queryKey: ["project", id],
    queryFn: () => projectRequests.getProjectById(id, wsId)
  })
  return { data, isLoading, error }
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  const newProjectMutation = useMutation({
    mutationFn: projectRequests.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    }
  })

  return newProjectMutation
}
