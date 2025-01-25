import { useAppDispatch } from "@/hooks/alertManagement"
import { useDeleteWorkspace } from "@/hooks/workspaceManagement"
import { timedAlert } from "@/reducers/alertSlice"
import { Workspace } from "@/types/workspace"
import { AccessControl } from "./AccessControl"

type SingleWSProps = {
  name: string
  id: string
}

const SingleWorkspace = ({ name, id }: SingleWSProps) => {
  const deleteWorkspaceMutation = useDeleteWorkspace()
  const dispatch = useAppDispatch()

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete workspace ${name}?`)) {
      try {
        await deleteWorkspaceMutation.mutateAsync(id)
        dispatch(
          timedAlert({
            message: `Workspace deleted successfully`,
            severity: "success"
          })
        )
      } catch (err: any) {
        if (err.response?.status === 403) {
          dispatch(
            timedAlert({
              message: "You are not authorized to delete this workspace",
              severity: "warning"
            })
          )
          return
        }
        dispatch(
          timedAlert({
            message: "An error occurred while deleting the workspace",
            severity: "error"
          })
        )
      }
    }
  }

  return (
    <div className="relative border rounded-lg w-64 py-8 text-gray-200 hover:text-white bg-gradient-to-br from-sky-900 via-sky-500 to-sky-900 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <AccessControl workspaceId={id} minimumRequiredRole={0}>
        <div className="absolute top-2 right-2 px-2 py-1 bg-black rounded-full text-gray-100 font-bold cursor-pointer hover:bg-rose-900 transition-colors duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
          >
            X
          </button>
        </div>
      </AccessControl>

      <a href={`/workspace/${id}`} className="flex items-center gap-2 h-full px-4">
        <h3 className="font-bold text-lg">{name}</h3>
      </a>
    </div>
  )
}

type WorkspacesProps = {
  workspaces: Workspace[]
}

export const Workspaces = ({ workspaces }: WorkspacesProps) => {
  return (
    <div className="max-h-screen overflow-y-auto px-6 py-6">
      <div className="flex flex-wrap justify-center gap-6">
        {workspaces.map((ws) => (
          <SingleWorkspace key={ws.id} name={ws.name} id={ws.id} />
        ))}
      </div>
    </div>
  )
}
