import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
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
import axios from "axios"

export const Home = () => {
  const [showWorkspaces, setShowWorkspaces] = useState(false)
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false)
  const { id = "" } = useParams<{ id: string }>()
  const [fact, setFact] = useState(null);

  useEffect(() => {
    const getDogFact = async () => {
      const res = await axios.get("https://dogapi.dog/api/facts");
      setFact(res.data.facts);
    };
    getDogFact();
  }, []);

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
    <div className="flex flex-col justify-center items-center gap-10 h-screen bg-gray-900">
      <Alerts />
      <h1 className="text-4xl text-white font-bold">Hello, have a great day!</h1>
      <div>
        <p className="text-white">Also, fun dog fact.</p>
        <p className="max-w-56 bg-white text-black rounded p-5">{fact}</p>
      </div>
      <div className="flex flex-row gap-4">
        <Button
          className="bg-gray-200 text-gray-900 font-bold hover:bg-gray-100"
          onClick={handleShowWorkspaces}
        >
          My workspaces
        </Button>
        <Button
          className="bg-gray-200 text-gray-900 font-bold hover:bg-gray-100"
          onClick={handleCreateWorkspace}
        >
          Create workspace
        </Button>
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
