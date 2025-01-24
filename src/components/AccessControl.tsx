import { useRoleOfCurrentUser } from "@/hooks/useRoleOfCurrentUser"
import { Role } from "@/types/role"
import { useParams } from "react-router-dom"

export const AccessControl = ({
  minimumRequiredRole,
  children
}: {
  minimumRequiredRole: Role
  children: React.ReactNode
}) => {
  const { wsId = "" } = useParams<{ wsId: string }>()
  const { role, isLoading, error } = useRoleOfCurrentUser(wsId)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data...</div>

  if (role === undefined) return null

  if (role <= minimumRequiredRole) {
    return <>{children}</>
  }
  return null
}
