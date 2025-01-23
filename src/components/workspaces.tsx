import { useAppDispatch } from "@/hooks/alertManagement"
import { useDeleteWorkspace } from "@/hooks/workspaceManagement"
import { timedAlert } from "@/reducers/alertSlice"
import { Workspace } from "@/types/workspace"

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
    <div className="relative border rounded-lg p-6 bg-gradient-to-br from-rose-100 to-rose-200 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="absolute top-2 right-2 px-2 py-1 bg-rose-300 rounded-full text-rose-800 font-bold cursor-pointer hover:bg-rose-400 transition-colors duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleDelete()
          }}
        >
          X
        </button>
      </div>
      <a href={`/workspace/${id}`} className="flex flex-col items-start gap-2 hover:no-underline">
        <h3 className="font-bold text-lg text-gray-800 p-5">{name}</h3>
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
