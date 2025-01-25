import { useEffect, useState } from "react"
import { useGetUserRoleInworkspace } from "./workspaceManagement"
import { Role } from "@/types/role"

type RoleResult = {
  role: Role | undefined
  isLoading: boolean
  error: Error | null
}

export const useRoleOfCurrentUser = (workspaceId: string): RoleResult => {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("userId")
    if (storedUserId) {
      setUserId(storedUserId)
    }
  }, [])

  const {
    data: currentUserRole,
    isLoading,
    error
  } = useGetUserRoleInworkspace(workspaceId, userId)

  return {
    role: currentUserRole,
    isLoading,
    error: error || null
  }
}
