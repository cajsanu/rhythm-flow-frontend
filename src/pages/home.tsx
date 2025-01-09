import { useParams } from "react-router-dom"
import { useState } from "react"
import { Workspaces, CreateWorkspaceForm } from "../components"
import { useGetWorkspaces } from "@/hooks/workspaceManagement"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

export const Home = () => {
  const [showWorkspaces, setShowWorkspaces] = useState(false)
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false)
  const { id = "" } = useParams<{ id: string }>()

  const { data: workspaces, isLoading, error } = useGetWorkspaces(id)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleShowWorkspaces = () => setShowWorkspaces((prev) => !prev)

  const handleCreateWorkspace = () => setShowCreateWorkspace((prev) => !prev)

  const handleSuccess = () => {
    setShowCreateWorkspace(false)
    setShowWorkspaces(true)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-2xl">Welcome!</h1>
      <div className="flex flex-row gap-4">
        <Button onClick={handleShowWorkspaces}>My workspaces</Button>
        <Button onClick={handleCreateWorkspace}>Create workspace</Button>
      </div>
      <div>
        {workspaces && workspaces.length >= 1 && showWorkspaces ? (
          <Workspaces workspaces={workspaces} />
        ) : null}
      </div>
      <div>
        <div>
          <Dialog open={showCreateWorkspace} onOpenChange={handleCreateWorkspace}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Workspace</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new workspace.
                </DialogDescription>
              </DialogHeader>
              <CreateWorkspaceForm onSuccess={handleSuccess} />
            </DialogContent>
          </Dialog>
        </div>
        <div></div>
      </div>
    </div>
  )
}
