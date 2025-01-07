import { Workspace } from "@/types/workspace"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import workspaceRequests from "@/api/workspaces"
import projectRequests from "@/api/projects"
import { Project } from "@/types/project"
import { Projects } from "@/components/projects"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const WorkspaceView = () => {
  const { id } = useParams<{ id: string }>()

  const { data: workspace, isLoading: wsLoading } = useQuery<Workspace>({
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
  const { data: projects, isLoading: projLoading } = useQuery<Project[]>({
    queryKey: ["projects", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Workspace ID is undefined")
      }
      const projects = await projectRequests.getProjectsInWorkspace(id)
      if (!projects) {
        throw new Error("Failed to fetch projects")
      }

      return projects
    }
  })

  if (projLoading || wsLoading) {
    return <div>loading data...</div>
  }

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-4xl shadow-lg bg-rose-400">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {workspace ? `Workspace: ${workspace.name}` : "Workspace"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {workspace ? (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Projects in this Workspace</h3>
              {projects && projects.length > 0 ? (
                <div className="space-y-4">
                  <Projects projects={projects} />
                </div>
              ) : (
                <p className="text-gray-500">No projects in this workspace yet.</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No workspace selected.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
