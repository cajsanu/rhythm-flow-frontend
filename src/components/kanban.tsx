import {
  useAssignUserToTicket,
  useGetTicketsInProject,
  useUpdateTicket
} from "@/hooks/ticketManagement"
import { Column } from "@/pages/projectView"
import { Ticket } from "@/types/ticket"
import { useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { useGetUsersInProject } from "@/hooks/projectManagement"
import { useAppDispatch } from "@/hooks/alertManagement"
import { timedAlert } from "@/reducers/alertSlice"
import { AxiosError } from "axios"

// Draggable Item Types
const ItemTypes = {
  TICKET: "ticket"
}

// Ticket Component
const SingleTicket = ({ ticket, onDrop }: { ticket: Ticket; onDrop: (id: string) => void }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TICKET,
    item: { id: ticket.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [showCreateTicket, setShowCreateTicket] = useState(false)
  const { wsId = "" } = useParams<{ wsId: string }>()
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const dispatch = useAppDispatch()

  const { data: users, isLoading, error } = useGetUsersInProject(ticket.projectId, wsId)

  const handleOpenTicket = () => setShowCreateTicket((prev) => !prev)

  const asignUserToTicketMutation = useAssignUserToTicket()

  const handleAssignTicket = async () => {
    try {
      await asignUserToTicketMutation.mutateAsync({
        workspaceId: wsId,
        projectId: ticket.projectId,
        ticketId: ticket.id,
        userId: selectedUserId
      })
      dispatch(
        timedAlert({
          message: `User assigned to ticket successfully`,
          severity: "success"
        })
      )
    } catch (err) {
      dispatch(
        timedAlert({
          message: "An error occurred while assigning the user to the ticket",
          severity: "error"
        })
      )
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading users.</div>

  return (
    <div
      ref={drag}
      className="border p-3 font-semibold rounded-lg bg-gray-800 shadow-md mb-2 hover:bg-gray-900"
    >
      <Dialog open={showCreateTicket} onOpenChange={handleOpenTicket}>
        <DialogContent className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
          <DialogHeader>
            <div className="mb-4">
              <DialogTitle className="text-2xl font-bold text-gray-800">{ticket.title}</DialogTitle>
              <DialogDescription></DialogDescription>
              <div className="flex items-center justify-between text-sm text-gray-700 mt-2">
                <p>
                  <span className="font-bold">Deadline:</span> {ticket.deadline}
                </p>
                <p>
                  <span className="font-bold">Priority:</span> {(ticket.priority === 2 && "High") || (ticket.priority === 1 && "Medium") || "Low"}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="mb-6">
            <p className="bg-gray-100 text-gray-700 p-4 rounded-md">{ticket.description}</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                <span className="font-bold">Assignees:</span>
              </p>
              <div className="space-y-1">
                {ticket.users?.map((user) => (
                  <div
                    key={user.id}
                    className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-md"
                  >
                    {user.email}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="userSelect">
              Assign a User:
            </label>
            <select
              id="userSelect"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={selectedUserId || ""}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="" disabled>
                Select a user
              </option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleAssignTicket}>Assign Ticket</Button>
          </div>
        </DialogContent>
      </Dialog>

      <button onClick={handleOpenTicket} className="w-full text-left text-gray-100 font-medium">
        {ticket.title}{" "}
        <span className="text-xs text-gray-400">
          {(ticket.priority === 2 && "🔴") || (ticket.priority === 1 && "🟠") || "🟢"}
        </span>
      </button>
    </div>
  )
}

// Column Component
const SingleColumn = ({
  column,
  onDropTicket
}: {
  column: Column
  onDropTicket: (ticketId: string, targetColumnId: number) => void
}) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TICKET,
    drop: (item: { id: string }) => {
      onDropTicket(item.id, column.id)
    }
  })

  return (
    <div ref={drop}>
      <Card className="bg-gradient-to-br from-sky-900 via-sky-300 to-sky-900">
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-bold text-gray-100">{column.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96">
            <div className="p-4 space-y-2">
              {column.tickets.map((ticket) => (
                <SingleTicket
                  key={ticket.id}
                  ticket={ticket}
                  onDrop={(id) => onDropTicket(id, column.id)}
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

type KanbanProps = {
  workspaceId: string
}

// Main Kanban Component
export const Kanban = ({ workspaceId }: KanbanProps) => {
  const { wsId = "", projectId = "" } = useParams<{ wsId: string; projectId: string }>()

  const updateTicketStatus = useUpdateTicket()

  const dispatch = useAppDispatch()

  const { data: tickets, isLoading, error } = useGetTicketsInProject(projectId, wsId)

  // Initialize columns and dynamically populate with tickets
  const columns = [
    { id: 0, title: "Not started", tickets: [] },
    { id: 1, title: "In Progress", tickets: [] },
    { id: 2, title: "Completed", tickets: [] },
    { id: 3, title: "Cancelled", tickets: [] }
  ].map((column) => ({
    ...column,
    tickets: tickets?.filter((ticket) => ticket.status === column.id) || []
  }))

  const handleDropTicket = async (ticketId: string, targetColumnId: number) => {
    const ticket = tickets?.find((ticket) => ticket.id === ticketId)
    if (!ticket) return

    try {
      await updateTicketStatus.mutateAsync({
        workspaceId: workspaceId,
        updatedTicket: { ...ticket, status: targetColumnId }
      })
    } catch (err) {
      dispatch(
        timedAlert({
          message: "An error occurred while updating the ticket status",
          severity: "error"
        })
      )
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading tickets.</div>

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-4 md:flex-row md:overflow-x-auto">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 md:w-64">
            <SingleColumn column={column} onDropTicket={handleDropTicket} />
          </div>
        ))}
      </div>
    </DndProvider>
  )
}
