import { useGetTicketsInProject, useUpdateTicket } from "@/hooks/ticketManagement"
import { Column } from "@/pages/projectView"
import { Ticket } from "@/types/ticket"
import { useEffect, useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"

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

  return (
    <div ref={drag} className="border p-2 font-semibold rounded bg-gradient-to-r from-gray-100 to-gray-100 shadow-md mb-2">
      {ticket.title} <span className="text-xs text-gray-500">({ticket.deadline})</span>
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
      <Card className="w-64 bg-gradient-to-r from-sky-300 to-rose-400">
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-bold text-sky-900">{column.title}</CardTitle>
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
  const { wsId = "", id = "" } = useParams<{ wsId: string; id: string }>()

  const updateTicketStatus = useUpdateTicket()

  const {
    data: tickets,
    isLoading: ticketsLoading,
    error: ticketsError
  } = useGetTicketsInProject(id, wsId)

  // Initialize columns for the Kanban board (based on your tickets' status)
  const [columns, setColumns] = useState<Column[]>([
    { id: 0, title: "Not started", tickets: [] },
    { id: 1, title: "In Progress", tickets: [] },
    { id: 2, title: "Complted", tickets: [] },
    { id: 3, title: "Cancelled", tickets: [] }
  ])

  // Populate columns with tickets based on their status
  useEffect(() => {
    const updatedColumns = columns.map((column) => ({
      ...column,
      tickets: tickets ? tickets.filter((ticket) => ticket.status === column.id) : []
    }))
    setColumns(updatedColumns)
  }, [tickets])

  if (ticketsLoading) {
    return <div>Loading...</div>
  }

  if (ticketsError) {
    return <div>Error loading data...</div>
  }

  const handleDropTicket = async (ticketId: string, targetColumnId: number) => {
    const ticket = columns
      .find((col) => col.tickets.some((ticket) => ticket.id === ticketId))
      ?.tickets.find((ticket) => ticket.id === ticketId)

    if (!ticket) {
      return
    }

    try {
      await updateTicketStatus.mutateAsync({
        workspaceId: workspaceId,
        updatedTicket: { ...ticket, status: targetColumnId }
      })
    } catch (err) {
      console.error(err)
    }
  }

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
