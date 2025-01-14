import { useAssignUserToProject } from "@/hooks/projectManagement"
import { useGetUsersInWorkspace } from "@/hooks/workspaceManagement"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "./ui/button"
import { useAppDispatch } from "@/hooks/alertManagement"
import { timedAlert } from "@/reducers/alertSlice"

export const AddUserToProject = ({ onSuccess }: { onSuccess: () => void }) => {
  const { wsId = "", id = "" } = useParams<{ wsId: string; id: string }>()
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const dispatch = useAppDispatch()

  const { data: users, isLoading: userLoading, error: userError } = useGetUsersInWorkspace(wsId)

  const assignUserToProjectMutation = useAssignUserToProject()

  const handleAssignUserToProject = async () => {
    try {
      await assignUserToProjectMutation.mutateAsync({
        workspaceId: wsId,
        projectId: id,
        userId: selectedUserId
      })
      dispatch(
        timedAlert({
          message: `User added to project successfully`,
          severity: "success"
        })
      )
      onSuccess()
    } catch (err) {
      dispatch(
        timedAlert({
          message: "An error occurred while adding the user to the project",
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
      <Button onClick={handleAssignUserToProject} className="mt-4">
        Add User
      </Button>
    </div>
  )
}
