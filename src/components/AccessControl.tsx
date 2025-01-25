import { useRoleOfCurrentUser } from "@/hooks/useRoleOfCurrentUser"
import { Role } from "@/types/role"
import { useParams } from "react-router-dom"

export const AccessControl = ({
  minimumRequiredRole,
  workspaceId,
  children
}: {
  minimumRequiredRole: Role
  workspaceId?: string
  children: React.ReactNode
}) => {
  const { wsId = "" } = useParams<{ wsId: string }>()
  // if workspaceId is not provided, use the workspaceId from the URL
  const { role, isLoading, error } = useRoleOfCurrentUser(workspaceId ?? wsId)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data...</div>

  if (role === undefined) return null

  if (role <= minimumRequiredRole) {
    return <>{children}</>
  }
  return null
}
