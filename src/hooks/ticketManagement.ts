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
