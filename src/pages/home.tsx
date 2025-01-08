import { useParams } from "react-router-dom"
import { useState } from "react"
import { Workspaces, CreateWorkspace } from "../components"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useGetWorkspaces } from "@/hooks/workspaceManagement"

export const Home = () => {
  const [showWorkspaces, setShowWorkspaces] = useState(false)
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false)
  const { id = "" } = useParams<{ id: string }>()

  const { data: workspaces, isLoading, error } = useGetWorkspaces(id)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

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
      <div>
        {workspaces && workspaces.length >= 1 && showWorkspaces ? (
          <Workspaces workspaces={workspaces} />
        ) : null}
      </div>
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
