import { useParams } from "react-router-dom"
import { Projects } from "@/components/projects"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetWorkspaceById } from "@/hooks/workspaceManagement"
import { useGetProjectsInWorkspace } from "@/hooks/projectManagement"

export const WorkspaceView = () => {
  const { id = "" } = useParams<{ id: string }>()

  const { data: workspace, isLoading: wsLoading, error: wsError } = useGetWorkspaceById(id)
  const { data: projects, isLoading: projLoading, error: projError } = useGetProjectsInWorkspace(id)

  if (projLoading || wsLoading) {
    return <div>loading data...</div>
  }

  if (projError || wsError) {
    return <div>error loading data...</div>
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
