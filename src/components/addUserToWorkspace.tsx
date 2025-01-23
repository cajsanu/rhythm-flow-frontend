import { useAddUserToWorkspace } from "@/hooks/workspaceManagement"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "./ui/button"
import { useGetUsers } from "@/hooks/userManagement"
import { Role } from "@/types/role"
import { userWorkspaceSchema } from "@/types/workspace"
import { timedAlert } from "@/reducers/alertSlice"
import { useAppDispatch } from "@/hooks/alertManagement"

export const AddUserToWorkspace = ({ onSuccess }: { onSuccess: () => void }) => {
  const { wsId = "" } = useParams<{ wsId: string }>()
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [selectedRole, setSelectedRole] = useState<Role>(2)
  const dispatch = useAppDispatch()

  const { data: users, isLoading: userLoading, error: userError } = useGetUsers()

  const addUserToWorkspaceMutation = useAddUserToWorkspace()

  const handleAssignUserToWorkspace = async () => {
    try {
      const data = {
        workspaceId: wsId,
        userId: selectedUserId,
        role: selectedRole
      }

      const mappedRole =
        selectedRole === 0
          ? " Workspace Owner"
          : selectedRole === 1
          ? " Project Manager"
          : " User"

      // Validate the input against the schema
      userWorkspaceSchema.parse(data)

      await addUserToWorkspaceMutation.mutateAsync(data)
      dispatch(
        timedAlert({
          message: `User added to workspace with role: ${mappedRole}`,
          severity: "success"
        })
      )
      onSuccess()
    } catch (err: any) {
      if (err.response?.status === 403) {
        dispatch(
          timedAlert({
            message: "You are not authorized to add users to this workspace",
            severity: "error"
          })
        )
        return
      }
      dispatch(
        timedAlert({
          message: "An error occurred while adding the user to the workspace",
          severity: "error"
        })
      )
    }
  }

  if (userLoading) return <div>Loading...</div>
  if (userError) return <div>Error loading users.</div>

  return (
    <div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="userSelect">
          Who do you want to add?:
        </label>
        <select
          id="userSelect"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="" disabled>
            Select a user
          </option>
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="roleSelect">
          What role do you want to assign?:
        </label>
        <select
          id="roleSelect"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={selectedRole}
          onChange={(e) => setSelectedRole(Number(e.target.value) as Role)}
        >
          <option value="2">User</option>
          <option value="1">Project Manager</option>
        </select>
      </div>

      <Button onClick={handleAssignUserToWorkspace} className="mt-4">
        Add User
      </Button>
    </div>
  )
}
