import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import projectRequests from "@/api/projects"
import { Project } from "@/types/project"

export const useGetProjectsInWorkspace = (id: string, search: string) => {
  const { data, isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects", id, search], // Include search in queryKey for caching
    queryFn: async () => {
      const projects = await projectRequests.getProjectsInWorkspace(id)
      if (search.trim()) {
        return projects.filter((project) =>
          project.name.toLowerCase().includes(search.toLowerCase())
        )
      }
      return projects
    }
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

export const useDeleteProject = () => {
  const queryClient = useQueryClient()

  const deleteProjectMutation = useMutation({
    mutationFn: ({ projectId, workspaceId }: { projectId: string; workspaceId: string }) =>
      projectRequests.deleteProject(projectId, workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    }
  })

  return deleteProjectMutation
}
