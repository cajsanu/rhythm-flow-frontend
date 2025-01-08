import { Ticket } from "@/types/ticket"
import { useQuery } from "@tanstack/react-query"
import ticketRequests from "@/api/tickets"

export const useGetTicketsInProject = (id: string, wsId: string) => {
  const { data, isLoading, error } = useQuery<Ticket[]>({
    queryKey: ["tickets", id],
    queryFn: () => ticketRequests.getTicketsInProject(id, wsId)
  })
  return { data, isLoading, error }
}
