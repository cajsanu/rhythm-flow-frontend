import { useAppDispatch } from "@/hooks/alertManagement"
import { useUnassignUserFromProject } from "@/hooks/projectManagement"
import { useRoleOfCurrentUser } from "@/hooks/useRoleOfCurrentUser"
import { useGetUserRoleInworkspace } from "@/hooks/workspaceManagement"
import { timedAlert } from "@/reducers/alertSlice"
import { Project } from "@/types/project"
import { User } from "@/types/user"
import { useParams } from "react-router-dom"
import { AccessControl } from "./AccessControl"

const SingleUser = ({
  user,
  handleDelete
}: {
  user: User
  handleDelete: (userId: string) => void
}) => {
  const { wsId = "" } = useParams<{ wsId: string }>()
  const { data: role, isLoading, error } = useGetUserRoleInworkspace(wsId, user.id)


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  const mappedRole =
    role === 0 ? " (Workspace Owner)" : role === 1 ? " (Project Manager)" : " (User)"

  return (
    <div
      key={user.id}
      className="flex items-center justify-between p-3 bg-white rounded-md shadow hover:bg-gray-100 transition"
    >
      <div className="text-gray-700">
        <span className="font-medium">
          {user.firstName} {user.lastName}
        </span>
        <br />
        <span className="text-sm text-gray-400">
          {user.email} <span className="text-xs text-gray-500">{mappedRole}</span>
        </span>
      </div>
    <AccessControl minimumRequiredRole={1}>
      <div className="px-2 py-1 bg-rose-300 rounded-full text-rose-800 font-bold cursor-pointer hover:bg-rose-400 transition-colors duration-300">
        <button onClick={() => handleDelete(user.id)}>X</button>
      </div>
    </AccessControl>
    
    </div>
  )
}

type UsersProps = {
  users: User[]
  typeOfResource: "workspace" | "project"
  project?: Project
}

export const Users = ({ users, typeOfResource, project }: UsersProps) => {
  const dispatch = useAppDispatch()
  const unassignUserFromProjectMutation = useUnassignUserFromProject()

  const handleDelete = (userId: string) => {
    if (typeOfResource === "workspace") {
      dispatch(
        timedAlert({
          message: "Removing users from workspaces is not supported yet",
          severity: "error"
        })
      )
      return
    }

    if (project?.users?.length === 1) {
      dispatch(
        timedAlert({
          message: "A project must have at least one user",
          severity: "warning"
        })
      )
      return
    }

    if (window.confirm(`Are you sure you want to remove this user from the project?`)) {
      try {
        unassignUserFromProjectMutation.mutate({
          workspaceId: project?.workspaceId ?? "",
          projectId: project?.id ?? "",
          userId: userId
        })
        dispatch(
          timedAlert({
            message: "User removed from project",
            severity: "success"
          })
        )
      } catch (err) {
        dispatch(
          timedAlert({
            message: "An error occurred while removing the user from the project",
            severity: "error"
          })
        )
      }
    }
  }

  return (
    <div>
      <div className="max-h-80 overflow-y-auto px-4 py-2 bg-gray-50 rounded-lg shadow-inner">
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <SingleUser key={user.id} user={user} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  )
}
