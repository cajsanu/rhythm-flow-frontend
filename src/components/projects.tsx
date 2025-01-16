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
      } catch (err: any) {
        if (err.response?.status === 403) {
          dispatch(
            timedAlert({
              message: "You are not authorized to delete this project",
              severity: "error"
            })
          )
          return
        }
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
      <a
        href={`${wsId}/project/${id}`}
        className="flex flex-col items-start gap-2 hover:no-underline"
      >
        <h3 className="font-bold text-lg text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Due:</span> {endDate}
        </p>
      </a>
    </div>
  )
}

type ProjectsProps = {
  projects: Project[]
}

export const Projects = ({ projects }: ProjectsProps) => {
  return (
    <div className="max-h-96 overflow-y-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-10">
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
    </div>
  )
}
