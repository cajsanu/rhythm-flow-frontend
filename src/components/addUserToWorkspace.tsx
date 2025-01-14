import { useAddUserToWorkspace } from "@/hooks/workspaceManagement"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "./ui/button"
import { useGetUsers } from "@/hooks/userManagement"
import { Role } from "@/types/role"
import { userWorkspaceSchema } from "@/types/workspace"
import { ZodError } from "zod"
import { timedAlert } from "@/reducers/alertSlice"
import { useAppDispatch } from "@/hooks/alertManagement"

export const AddUserToWorkspace = ({ onSuccess }: { onSuccess: () => void }) => {
  const { id = "" } = useParams<{ id: string }>()
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [selectedRole, setSelectedRole] = useState<Role>("User")
  const dispatch = useAppDispatch()

  const { data: users, isLoading: userLoading, error: userError } = useGetUsers()

  const addUserToWorkspaceMutation = useAddUserToWorkspace()

  const handleAssignUserToWorkspace = async () => {
    try {
      const data = {
        workspaceId: id,
        userId: selectedUserId,
        role: selectedRole
      }

      // Validate the input against the schema
      userWorkspaceSchema.parse(data)

      await addUserToWorkspaceMutation.mutateAsync(data)
      dispatch(
        timedAlert({
          message: `User added to workspace with role: ${selectedRole}`,
          severity: "success"
        })
      )
      onSuccess()
    } catch (err) {
      if (err instanceof ZodError) {
        dispatch(
          timedAlert({
            message: err.errors[0].message,
            severity: "error"
          })
        )
      } else {
        dispatch(
          timedAlert({
            message: "An error occurred while adding the user to the workspace",
            severity: "error"
          })
        )
      }
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
          onChange={(e) => setSelectedRole(e.target.value as Role)}
        >
          <option value="User">User</option>
          <option value="ProjectManager">Project Manager</option>
        </select>
      </div>

      <Button onClick={handleAssignUserToWorkspace} className="mt-4">
        Add User
      </Button>
    </div>
  )
}
