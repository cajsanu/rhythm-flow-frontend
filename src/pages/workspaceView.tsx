import { useParams } from "react-router-dom"
import { Projects } from "@/components/projects"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetWorkspaceById } from "@/hooks/workspaceManagement"
import { useGetProjectsInWorkspace } from "@/hooks/projectManagement"
import { CreateProjectForm } from "@/components"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import { AddUserToWorkspace } from "@/components/addUserToWorkspace"

export const WorkspaceView = () => {
  const { id = "" } = useParams<{ id: string }>()
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [search, setSearch] = useState<string>("")
  const [showAddUsers, setShowAddUsers] = useState(false)

  const { data: workspace, isLoading: wsLoading, error: wsError } = useGetWorkspaceById(id)
  const {
    data: projects,
    isLoading: projLoading,
    error: projError
  } = useGetProjectsInWorkspace(id, search)

  const handleCreateProject = () => setShowCreateProject((prev) => !prev)
  const handleShowAddUsers = () => setShowAddUsers((prev) => !prev)

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleSuccessCreate = () => setShowCreateProject(false)
  const handleSuccessAdd = () => setShowAddUsers(false)

  if (projLoading || wsLoading) return <div>Loading...</div>
  if (projError || wsError) return <div>Error loading data...</div>

  return (
    <div className="flex justify-center py-10 bg-sky-200 h-screen">
      <Card className="w-5/6 max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {workspace ? `${workspace.name}` : "Workspace"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {workspace ? (
            <div className="text-center">
              <div className="flex space-x-4 justify-center">
                <div className="flex space-x-4">
                  <Button onClick={handleCreateProject}>+ Create Project</Button>
                  <Button onClick={handleShowAddUsers}>+ Add User</Button>
                  <div>
                    <Dialog open={showCreateProject} onOpenChange={handleCreateProject}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-3xl">Create Project</DialogTitle>
                          <DialogDescription>
                            Fill in the details to create a new project.
                          </DialogDescription>
                        </DialogHeader>
                        <CreateProjectForm onSuccess={handleSuccessCreate} />
                      </DialogContent>
                    </Dialog>
                    <Dialog open={showAddUsers} onOpenChange={handleShowAddUsers}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-3xl">Add users to workspace</DialogTitle>
                          <DialogDescription>Assign users to the workspace.</DialogDescription>
                        </DialogHeader>
                        <AddUserToWorkspace onSuccess={handleSuccessAdd} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              <div className="flex justify-center pt-10">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search projects by name..."
                  className="border rounded-md p-2 w-64 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                {projects && projects.length > 0 ? (
                  <div className="space-y-4">
                    <Projects projects={projects} />
                  </div>
                ) : (
                  <p className="text-gray-500">No projects in this workspace yet.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No workspace selected.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
