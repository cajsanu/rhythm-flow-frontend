import { useGetTicketsInProject, useUpdateTicket } from "@/hooks/ticketManagement"
import { Column } from "@/pages/projectView"
import { Ticket } from "@/types/ticket"
import { useEffect, useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useParams } from "react-router-dom"

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
    <div ref={drag} className="border p-2 rounded bg-rose-100 shadow-md mb-2">
      {ticket.title}
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
    <div ref={drop} className="border p-2 rounded bg-sky-200 shadow-md">
      <h3 className="font-bold p-2 underline">{column.title}</h3>
      <div className="mt-2 h-96 overflow-y-auto w-60">
        {column.tickets.map((ticket) => (
          <SingleTicket
            key={ticket.id}
            ticket={ticket}
            onDrop={(id) => onDropTicket(id, column.id)}
          />
        ))}
      </div>
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
    { id: 0, title: "To Do", tickets: [] },
    { id: 1, title: "In Progress", tickets: [] },
    { id: 2, title: "Done", tickets: [] }
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
      <div className="flex gap-4">
        {columns.map((column) => (
          <SingleColumn key={column.id} column={column} onDropTicket={handleDropTicket} />
        ))}
      </div>
    </DndProvider>
  )
}
