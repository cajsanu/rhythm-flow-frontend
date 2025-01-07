export interface Ticket {
  id: string
  title: string
  description: string
  priority: number
  deadline: string
  status: string
  projectId: string
  type: number
  userIds: string[]
}
