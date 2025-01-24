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
    <div className="relative border rounded-lg p-6 bg-gradient-to-br from-sky-900 via-sky-500 to-sky-900 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="absolute top-2 right-2 px-2 py-1 bg-black rounded-full text-white font-bold cursor-pointer hover:bg-rose-900 transition-colors duration-300">
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
        <h3 className="font-bold text-lg text-gray-200 hover:text-white p-5">{name}</h3>
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
