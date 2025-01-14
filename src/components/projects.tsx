import { useAppDispatch } from "@/hooks/alertManagement"
import { useDeleteProject } from "@/hooks/projectManagement"
import { timedAlert } from "@/reducers/alertSlice"
import { Project } from "@/types/project"

type SingleProjProps = {
  name: string
  endDate: string
  id: string
  wsId: string
}

const SingleProject = ({ name, endDate, id, wsId }: SingleProjProps) => {
  const deleteProjectMutation = useDeleteProject()
  const dispatch = useAppDispatch()

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete project ${name}?`)) {
      try {
        await deleteProjectMutation.mutateAsync({ projectId: id, workspaceId: wsId })
        dispatch(
          timedAlert({
            message: `Project deleted successfully`,
            severity: "success"
          })
        )
      } catch (err) {
        dispatch(
          timedAlert({
            message: "An error occurred while deleting the project",
            severity: "error"
          })
        )
      }
    }
  }
  return (
    <div className="relative border rounded-xl p-10 flex flex-col bg-rose-100 hover:bg-rose-300">
      <div className="absolute top-0 right-0 p-2 px-3 bg-rose-200 rounded-bl-xl rounded-tr-xl text-rose-800 font-bold">
        <button onClick={handleDelete}>X</button>
      </div>
      <a href={`${wsId}/project/${id}`}>
        <ul className="font-bold text-xl text-rose-800 pb-2">{name}</ul>
        <ul className="text-rose-800 text-sm">Due: {endDate}</ul>
      </a>
    </div>
  )
}

type ProjectsProps = {
  projects: Project[]
}

export const Projects = ({ projects }: ProjectsProps) => {
  return (
    <div className="flex flex-wrap justify-center py-10 gap-10">
      {projects.map((p) => (
        <SingleProject
          key={p.id}
          name={p.name}
          endDate={p.endDate}
          id={p.id}
          wsId={p.workspaceId}
        />
      ))}
    </div>
  )
}
