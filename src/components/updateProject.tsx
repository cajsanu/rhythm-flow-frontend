import { useState } from "react"
import { useUpdateProject } from "@/hooks/projectManagement"
import { useAppDispatch } from "@/hooks/alertManagement"
import { timedAlert } from "@/reducers/alertSlice"
import { Project, updateProjectSchema } from "@/types/project"

export const UpdateProject = ({ project }: { project: Project }) => {
  const [editingField, setEditingField] = useState("") // Tracks the field being edited
  const [updatedProject, setUpdatedProject] = useState({
    name: project.name,
    description: project.description,
    startDate: project.startDate,
    endDate: project.endDate,
    status: project.status
  })

  const dispatch = useAppDispatch()

  const updateProjectMutation = useUpdateProject()

  const handleEdit = (field: string) => {
    setEditingField(field)
  }

  const handleChange = (field: string, value: string) => {
    setUpdatedProject((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = async () => {
    if (editingField) {
      const data = {
        ...updatedProject,
        status: Number(updatedProject.status),
        id: project.id,
        workspaceId: project.workspaceId
      }

      const res = updateProjectSchema.safeParse(data)
      if (!res.success) {
        dispatch(
          timedAlert({
            message: res.error.errors[0].message,
            severity: "error"
          })
        )
        return
      }

      try {
        await updateProjectMutation.mutateAsync({ ...data })
      } catch (err: any) {
        if (err.response?.status === 403) {
          dispatch(
            timedAlert({
              message: "You are not authorized to update this project",
              severity: "warning"
            })
          )
          return
        }
        dispatch(
          timedAlert({
            message: "An error occurred while updating the project",
            severity: "error"
          })
        )
      }

      setEditingField("")
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-sky-800 via-black to-sky-800 text-gray-100 rounded-lg shadow-lg">
      <div className="text-4xl font-bold pb-4">
        {editingField === "name" ? (
          <textarea
            className="w-full bg-gray-700 text-gray-100 rounded-lg p-2 mt-2 focus:outline-none focus:ring focus:ring-sky-200"
            value={updatedProject.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <button
            className="mt-2 text-gray-300 cursor-pointer hover:underline bg-transparent border-none p-0"
            onClick={() => handleEdit("name")}
          >
            {project.name || "Click to add a name..."}
          </button>
        )}
      </div>

      <div className="flex flex-row justify-between">
        <div>
          <div>
            <strong className="text-gray-400 pe-2">Description:</strong>
            {editingField === "description" ? (
              <textarea
                className="w-full bg-gray-700 text-gray-100 rounded-lg p-2 mt-2 focus:outline-none focus:ring focus:ring-sky-200"
                value={updatedProject.description}
                onChange={(e) => handleChange("description", e.target.value)}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <button
                className="mt-2 text-gray-300 cursor-pointer hover:underline bg-transparent border-none p-0"
                onClick={() => handleEdit("description")}
              >
                {project.description || "Click to add a description..."}
              </button>
            )}
          </div>

          <div>
            <strong className="text-gray-400 pe-2">Start Date:</strong>
            {editingField === "startDate" ? (
              <input
                type="date"
                className="w-full bg-gray-700 text-gray-100 rounded-lg p-2 mt-2 focus:outline-none focus:ring focus:ring-sky-200"
                value={updatedProject.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <button
                className="mt-2 text-gray-300 cursor-pointer hover:underline bg-transparent border-none p-0"
                onClick={() => handleEdit("startDate")}
              >
                {project.startDate || "Click to set a start date..."}
              </button>
            )}
          </div>
        </div>

        <div>
          <div>
            <strong className="text-gray-400 pe-2">End Date:</strong>
            {editingField === "endDate" ? (
              <input
                type="date"
                className="w-full bg-gray-700 text-gray-100 rounded-lg p-2 mt-2 focus:outline-none focus:ring focus:ring-sky-200"
                value={updatedProject.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <button
                className="mt-2 text-gray-300 cursor-pointer hover:underline bg-transparent border-none p-0"
                onClick={() => handleEdit("endDate")}
              >
                {project.endDate || "Click to set an end date..."}
              </button>
            )}
          </div>

          <div>
            <strong className="text-gray-400 pe-2">Status:</strong>
            {editingField === "status" ? (
              <select
                className="w-full bg-gray-700 text-gray-100 rounded-lg p-2 mt-2 focus:outline-none focus:ring focus:ring-sky-200"
                value={updatedProject.status}
                onChange={(e) => handleChange("status", e.target.value)}
                onBlur={handleBlur}
                autoFocus
              >
                <option value="0">Not started</option>
                <option value="1">In progress</option>
                <option value="2">Completed</option>
                <option value="3">Cancelled</option>
              </select>
            ) : (
              <button
                className="mt-2 text-gray-300 cursor-pointer hover:underline bg-transparent border-none p-0"
                onClick={() => handleEdit("status")}
              >
                {(project.status === 0 && "Not started") ||
                  (project.status === 1 && "In progress") ||
                  (project.status === 2 && "Completed") ||
                  (project.status === 3 && "Cancelled") ||
                  "Click to set a status..."}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
