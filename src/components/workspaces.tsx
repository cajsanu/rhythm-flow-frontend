import { useDeleteWorkspace } from "@/hooks/workspaceManagement"
import { Workspace } from "@/types/workspace"

type SingleWSProps = {
  name: string
  id: string
}

const SingleWorkspace = ({ name, id }: SingleWSProps) => {
  const deleteWorkspaceMutation = useDeleteWorkspace()
  
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete workspace ${name}?`)) {
      try {
        await deleteWorkspaceMutation.mutateAsync(id)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className="relative border rounded-xl p-10 flex flex-col bg-rose-100 hover:bg-rose-300">
      <div>
        <div className="absolute top-0 right-0 p-2 px-3 bg-rose-200 rounded-bl-xl rounded-tr-xl text-rose-800 font-bold">
          <button onClick={handleDelete}>X</button>
        </div>
      </div>
      <a href={`/workspace/${id}`}>
        <ul className="font-bold text-xl text-rose-800 pb-2">{name}</ul>
      </a>
    </div>
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
