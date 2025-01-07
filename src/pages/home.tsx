import workspaceRequests from "../api/workspaces"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Workspace } from "../types/workspace"
import { useState } from "react"
import { Workspaces, CreateWorkspace } from "../components"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"

export const Home = () => {
  const [showWorkspaces, setShowWorkspaces] = useState(false)
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false)
  const { id } = useParams<{ id: string }>()

  const { data: workspaces, isLoading } = useQuery<Workspace[]>({
    queryKey: ["workspaces", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Workspace ID is undefined")
      }
      const workspaces = await workspaceRequests.getMyWorkspaces(id)
      if (!workspaces) {
        throw new Error("Failed to fetch workspaces")
      }

      return workspaces
    }
  })

  if (isLoading) {
    return <div>loading data...</div>
  }

  const handleShowWorkspaces = () => setShowWorkspaces((prev) => !prev)

  const handleCreateWorkspace = () => setShowCreateWorkspace((prev) => !prev)

  const handleSuccess = () => setShowCreateWorkspace(false)

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-2xl">Welcome!</h1>
      <div className="flex flex-row gap-4">
        <button
          className="transition delay-150 flex w-full justify-center rounded-md bg-rose-300 px-3 py-1.5 text-sm font-semibold leading-6 text-rose-800 hover:bg-rose-200"
          onClick={handleShowWorkspaces}
        >
          My workspaces
        </button>
        <button
          className="transition delay-150 flex w-full justify-center rounded-md bg-rose-300 px-3 py-1.5 text-sm font-semibold leading-6 text-rose-800 hover:bg-rose-200"
          onClick={handleCreateWorkspace}
        >
          Create workspace
        </button>
      </div>
      <div>{workspaces && showWorkspaces ? <Workspaces workspaces={workspaces} /> : null}</div>
      <div>
        <div>
          <Modal
            open={showCreateWorkspace}
            onClose={handleCreateWorkspace}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>
              <CreateWorkspace onSuccess={handleSuccess} />
            </Box>
          </Modal>
        </div>
        <div></div>
      </div>
    </div>
  )
}
