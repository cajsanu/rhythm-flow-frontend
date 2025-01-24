import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  useGetUserRoleInworkspace,
  useGetUsersInWorkspace,
  useGetWorkspaceById
} from "@/hooks/workspaceManagement"
import { useGetProjectsInWorkspace } from "@/hooks/projectManagement"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useGetUserById } from "@/hooks/userManagement"
import { Alerts, Users, AddUserToWorkspace, Projects, CreateProjectForm } from "@/components"
import { useDebounce } from "@/hooks/useDebounce"
import SearchIcon from "@mui/icons-material/Search"
import { AxiosError } from "axios"
import { useRoleOfCurrentUser } from "@/hooks/useRoleOfCurrentUser"

export const WorkspaceView = () => {
  const { wsId = "" } = useParams<{ wsId: string }>()
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [search, setSearch] = useState<string>("")
  const [showAddUsers, setShowAddUsers] = useState(false)
  const [showUsers, setShowUsers] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  const { data: workspace, isLoading: wsLoading, error: wsError } = useGetWorkspaceById(wsId)

  const {
    data: owner,
    isLoading: ownerLoading,
    error: ownerError
  } = useGetUserById(workspace?.ownerId ?? "")

  const {
    data: projects,
    isLoading: projLoading,
    error: projError
  } = useGetProjectsInWorkspace(wsId, debouncedSearch)

  const { data: users, isLoading: usersLoading, error: usersError } = useGetUsersInWorkspace(wsId)

  const { role, isLoading: roleLoading, error: roleError } = useRoleOfCurrentUser(wsId)

  const handleCreateProject = () => setShowCreateProject((prev) => !prev)
  const handleShowAddUsers = () => setShowAddUsers((prev) => !prev)
  const handleShowUsers = () => setShowUsers((prev) => !prev)

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleCloseProjectForm = () => setShowCreateProject(false)
  const handleCloseAddUsers = () => setShowAddUsers(false)

  if (wsLoading || projLoading || usersLoading || ownerLoading || roleLoading)
    return <div>Loading...</div>
  if (projError || wsError || ownerError || usersError) {
    if ((wsError as AxiosError).response?.status === 403) {
      return (
        <div className="bg-gray-100 rounded p-2 text-rose-800">
          You don't have access to this resource
        </div>
      )
    }
    return <div className="bg-gray-100 rounded p-2 text-rose-800">Not found.</div>
  }

  if (roleError) {
    return (
      <div className="bg-gray-100 rounded p-2 text-rose-800">
        There was a problem finding user details.
      </div>
    )
  }

  return (
    <div className="flex justify-center py-10 bg-gradient-to-br from-sky-800 via-black to-sky-800 h-screen">
      <Card className="w-5/6 max-w-4xl shadow-lg">
        <CardHeader>
          {!showCreateProject && !showAddUsers && <Alerts />}
          <CardTitle className="text-center text-3xl">
            {workspace ? `${workspace.name}` : "Workspace"}
            {owner && <span className="text-gray-500 text-sm"> created by {owner.firstName}</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {workspace ? (
            <div className="text-center">
              <div className="flex space-x-4 justify-center">
                <div className="flex space-x-4">
                  {role !== undefined && (
                    <>
                      {role <= 1 && <Button onClick={handleCreateProject}>+ Create Project</Button>}
                      {role === 0 && <Button onClick={handleShowAddUsers}>+ Add User</Button>}
                      <Button onClick={handleShowUsers}>Current users</Button>
                    </>
                  )}
                  <div>
                    <Dialog open={showCreateProject} onOpenChange={handleCreateProject}>
                      <DialogContent>
                        <DialogHeader>
                          <Alerts />
                          <DialogTitle className="text-3xl">Create Project</DialogTitle>
                          <DialogDescription>
                            Fill in the details to create a new project.
                          </DialogDescription>
                        </DialogHeader>
                        <CreateProjectForm closeForm={handleCloseProjectForm} />
                      </DialogContent>
                    </Dialog>
                    <Dialog open={showAddUsers} onOpenChange={handleShowAddUsers}>
                      <DialogContent>
                        <DialogHeader>
                          <Alerts />
                          <DialogTitle className="text-3xl">Add user to workspace</DialogTitle>
                          <DialogDescription>Assign users to this workspace.</DialogDescription>
                        </DialogHeader>
                        <AddUserToWorkspace closeModal={handleCloseAddUsers} />
                      </DialogContent>
                    </Dialog>
                    <Dialog open={showUsers} onOpenChange={handleShowUsers}>
                      <DialogContent>
                        <DialogHeader>
                          <Alerts />
                          <DialogTitle className="text-3xl">Users</DialogTitle>
                          <DialogDescription>
                            List of users currently in this workspace.
                          </DialogDescription>
                        </DialogHeader>
                        {users && users.length > 0 ? (
                          <Users users={users} typeOfResource="workspace" />
                        ) : (
                          <p className="text-gray-500 mt-4 text-center">
                            No users in this workspace.
                          </p>
                        )}
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
                <svg className="w-8 h-8 text-gray-500 pt-2">
                  <SearchIcon />
                </svg>
              </div>
              <div>
                {projects && projects.length > 0 ? (
                  <div className="pt-10">
                    <Projects projects={projects} />
                  </div>
                ) : (
                  <p className="text-gray-500 pt-10">No projects found.</p>
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
