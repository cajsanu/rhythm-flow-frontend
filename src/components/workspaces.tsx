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
              severity: "error"
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
    <a href={`/workspace/${id}`}>
      <div className="relative border rounded-xl p-10 flex flex-col bg-white hover:bg-rose-100">
        <div className="absolute top-0 right-0 p-2 px-3 bg-rose-200 rounded-bl-xl rounded-tr-xl text-rose-800 font-bold hover:bg-rose-300">
          <button onClick={handleDelete}>X</button>
        </div>
        <ul className="font-bold text-xl text-gray-800 pb-2">{name}</ul>
      </div>
    </a>
  )
}

type WorkspacesProps = {
  workspaces: Workspace[]
}

export const Workspaces = ({ workspaces }: WorkspacesProps) => {
  return (
    <div className="flex flex-wrap justify-center py-10 gap-10">
      {workspaces.map((ws) => (
        <SingleWorkspace key={ws.id} name={ws.name} id={ws.id} />
      ))}
    </div>
  )
}
