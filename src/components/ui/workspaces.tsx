import { Workspace } from "@/types/workspace"

type SingleWSProps = {
  name: string
  id: string
}

const SingleWorkspace = ({ name, id }: SingleWSProps) => {
  return (
    <div className="relative border rounded-xl p-6 flex flex-col bg-rose-100 hover:bg-rose-300">
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
