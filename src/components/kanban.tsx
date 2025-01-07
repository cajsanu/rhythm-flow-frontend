import { Column, Ticket } from "@/pages/projectView"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

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
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "8px",
        margin: "4px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "grab"
      }}
    >
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
  onDropTicket: (ticketId: string, targetColumnId: string) => void
}) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TICKET,
    drop: (item: { id: string }) => {
      onDropTicket(item.id, column.id)
    }
  })

  return (
    <div
      ref={drop}
      style={{
        margin: "0 8px",
        padding: "16px",
        backgroundColor: "#f4f5f7",
        borderRadius: "4px",
        minWidth: "200px"
      }}
    >
      <h3 style={{ textAlign: "center" }}>{column.title}</h3>
      <div style={{ minHeight: "100px" }}>
        {column.tickets.map((ticket) => (
          <SingleTicket key={ticket.id} ticket={ticket} onDrop={(id) => onDropTicket(id, column.id)} />
        ))}
      </div>
    </div>
  )
}

type KanbanProps = {
  columns: Column[]
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
}

// Main Kanban Component
export const Kanban = ({ columns, setColumns }: KanbanProps) => {

  const handleDropTicket = (ticketId: string, targetColumnId: string) => {
    setColumns((prev) => {
      const sourceColumn = prev.find((col) => col.tickets.some((ticket) => ticket.id === ticketId))
      const targetColumn = prev.find((col) => col.id === targetColumnId)

      if (!sourceColumn || !targetColumn) return prev

      const ticket = sourceColumn.tickets.find((ticket) => ticket.id === ticketId)
      if (!ticket) return prev

      // Remove ticket from source column and add it to the target column
      sourceColumn.tickets = sourceColumn.tickets.filter((ticket) => ticket.id !== ticketId)
      targetColumn.tickets = [...targetColumn.tickets, ticket]

      return [...prev]
    })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", padding: "16px" }}>
        {columns.map((column) => (
          <SingleColumn key={column.id} column={column} onDropTicket={handleDropTicket} />
        ))}
      </div>
    </DndProvider>
  )
}
