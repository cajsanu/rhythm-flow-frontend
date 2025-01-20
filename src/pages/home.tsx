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
import { Alerts } from "@/components/alert"
import { LogOut } from "@/components/logout"

export const Home = () => {
  const [showWorkspaces, setShowWorkspaces] = useState(true)
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
    <div className="flex flex-col justify-center items-center gap-10 h-screen bg-gradient-to-r from-sky-300 to-rose-300">
      <Alerts />
      <h1 className="text-4xl text-white font-bold">Hello, have a great day!</h1>
      <div className="flex flex-row gap-4">
        <Button onClick={handleShowWorkspaces}>My workspaces</Button>
        <Button onClick={handleCreateWorkspace}>Create workspace</Button>
        <LogOut />
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
                <DialogTitle className="text-3xl">Create Workspace</DialogTitle>
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
