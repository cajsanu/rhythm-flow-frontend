import { useState } from "react"
import { useParams } from "react-router-dom"
import { Ticket } from "@/types/ticket"
import { useGetProjectById } from "@/hooks/projectManagement"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Kanban,
  Alerts,
  AddUserToProject,
  CreateTicketForm,
  UpdateProject,
  Users
} from "@/components"

export type Column = { id: number; title: string; tickets: Ticket[] }

export const ProjectView = () => {
  const { wsId = "", projectId = "" } = useParams<{ wsId: string; projectId: string }>()
  const [showCreateTicket, setShowCreateTicket] = useState(false)
  const [showAddUsers, setShowAddUsers] = useState(false)
  const [showUsers, setShowUsers] = useState(false)

  const userId = window.localStorage.getItem("userId") ?? ""

  const {
    data: project,
    isLoading: projLoading,
    error: projError
  } = useGetProjectById(projectId, wsId)

  const handleCreateTicket = () => setShowCreateTicket((prev) => !prev)
  const handleShowAddUsers = () => setShowAddUsers((prev) => !prev)
  const handleShowUsers = () => setShowUsers((prev) => !prev)

  const handleCloseTicketForm = () => setShowCreateTicket(false)

  const handleCloseAddUsers = () => setShowAddUsers(false)

  if (projLoading) return <div>Loading...</div>
  if (projError) return <div>Error loading data...</div>

  const userInProject = project?.users?.find((u) => u.id === userId)

  if (!userInProject) {
    return (
      <div className="p-10 font-bold bg-gray-100 rounded p-2 text-rose-800">
        You are not authorized to view this project
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen text-gray-100">
      <Alerts />
      <div className="w-full max-w-6xl rounded-lg p-8">
        {project && <UpdateProject project={project} />}

        <div className="flex gap-4 my-6">
          <Button
            className="bg-gray-200 text-gray-900 font-bold hover:bg-gray-100"
            onClick={handleCreateTicket}
          >
            + Create Ticket
          </Button>
          <Button
            className="bg-gray-200 text-gray-900 font-bold hover:bg-gray-100"
            onClick={handleShowAddUsers}
          >
            + Add Users
          </Button>
          <Button
            className="bg-gray-200 text-gray-900 font-bold hover:bg-gray-100"
            onClick={handleShowUsers}
          >
            View Users
          </Button>
        </div>

        {/* Kanban Board */}
        <Kanban workspaceId={wsId} />
      </div>

      {/* Create Ticket Dialog */}
      <Dialog open={showCreateTicket} onOpenChange={handleCreateTicket}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader>
            <Alerts />
            <DialogTitle className="text-2xl font-bold text-gray-900">Create Ticket</DialogTitle>
            <DialogDescription>Fill in the details to create a new ticket.</DialogDescription>
          </DialogHeader>
          <CreateTicketForm closeForm={handleCloseTicketForm} />
        </DialogContent>
      </Dialog>

      {/* Add Users Dialog */}
      <Dialog open={showAddUsers} onOpenChange={handleShowAddUsers}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader>
            <Alerts />
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Add Users to Project
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Assign users to the project to collaborate on tickets.
            </DialogDescription>
          </DialogHeader>
          <AddUserToProject closeModal={handleCloseAddUsers} />
        </DialogContent>
      </Dialog>

      <Dialog open={showUsers} onOpenChange={handleShowUsers}>
        <DialogContent>
          <DialogHeader>
            <Alerts />
            <DialogTitle className="text-3xl">Users</DialogTitle>
            <DialogDescription>List of users currently in this project.</DialogDescription>
          </DialogHeader>
          {project?.users ? (
            <Users users={project.users} typeOfResource="project" project={project} />
          ) : (
            <p className="text-gray-500 mt-4 text-center">No users in this project.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProjectView
