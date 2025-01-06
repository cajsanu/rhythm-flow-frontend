import { Workspace } from "@/types/workspace"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import workspaceRequests from "@/api/workspaces"

export const CurrentWorkspace = () => {
  const { id } = useParams<{ id: string }>()

  const { data: workspace, isLoading } = useQuery<Workspace>({
    queryKey: ["workspace"],
    queryFn: async () => {
      if (!id) {
        throw new Error("Workspace ID is undefined")
      }
      const workspace = await workspaceRequests.getWorkspaceById(id)
      if (!workspace) {
        throw new Error("Failed to fetch workspace")
      }

      return workspace
    }
  })

  // Another query to get all projects in the workspace
  // const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
  //   queryKey: ["projects", id],
  //   queryFn: async () => {
  //     if (!id) {
  //       throw new Error("Workspace ID is undefined")
  //     }
  //     const projects = await projectRequests.getProjectsInWorkspace(id)
  //     if (!projects) {
  //       throw new Error("Failed to fetch projects")
  //     }
  

  if (isLoading) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <h1>Workspace</h1>
      {workspace && (
        <div>
          <h2>{workspace.name}</h2>
        </div>
      )}
    </div>
  )
}
