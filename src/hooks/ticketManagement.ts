import { CreateTicket, Ticket } from "@/types/ticket"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ticketRequests from "@/api/tickets"

export const useGetTicketsInProject = (id: string, wsId: string) => {
  const { data, isLoading, error } = useQuery<Ticket[]>({
    queryKey: ["tickets", id],
    queryFn: () => ticketRequests.getTicketsInProject(id, wsId)
  })
  return { data, isLoading, error }
}

export const useGetTicketById = (id: string, wsId: string) => {
  const { data, isLoading, error } = useQuery<Ticket>({
    queryKey: ["ticket", id],
    queryFn: () => ticketRequests.getTicketById(id, wsId)
  })
  return { data, isLoading, error }
}

export const useCreateTicket = () => {
  const queryClient = useQueryClient()

  const newTickettMutation = useMutation({
    mutationFn: ({ workspaceId, newTicket }: { workspaceId: string; newTicket: CreateTicket }) =>
      ticketRequests.createTicket(workspaceId, newTicket),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] })
    }
  })

  return newTickettMutation
}

export const useUpdateTicket = () => {
  const queryClient = useQueryClient()

  const updateTicketMutation = useMutation({
    mutationFn: ({ workspaceId, updatedTicket }: { workspaceId: string; updatedTicket: Ticket }) =>
      ticketRequests.updateTicket(workspaceId, updatedTicket),
    onSettled: (_, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] })
      queryClient.setQueriesData({ queryKey: ["tickets"] }, (oldTickets: Ticket[]) =>
        oldTickets.map((ticket) => {
          if (ticket.id === variables.updatedTicket.id) {
            return variables.updatedTicket
          }
          return ticket
        })
      )
    }
  })

  return updateTicketMutation
}

export const useAssignUserToTicket = () => {
  const queryClient = useQueryClient()

  const assignUserToTicketMutation = useMutation({
    mutationFn: ({
      workspaceId,
      projectId,
      ticketId,
      userId
    }: {
      workspaceId: string
      projectId: string
      ticketId: string
      userId: string
    }) => ticketRequests.assignUserToTicket(workspaceId, projectId, ticketId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] })
    }
  })
  return assignUserToTicketMutation
}
