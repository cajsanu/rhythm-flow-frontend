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
import { Alerts, LogOut } from "@/components"
import axios from "axios"

export const Home = () => {
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false)
  const { userId = "" } = useParams<{ userId: string }>()
  const [fact, setFact] = useState(null)

  useEffect(() => {
    const getDogFact = async () => {
      const res = await axios.get("https://dogapi.dog/api/facts")
      setFact(res.data.facts)
    }
    getDogFact()
  }, [])

  const { data: workspaces, isLoading, error } = useGetWorkspaces(userId)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleCreateWorkspace = () => setShowCreateWorkspace((prev) => !prev)

  const handleCloseForm = () => setShowCreateWorkspace(false)

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-800 via-black to-sky-800">
      <aside className="transform bg-gradient-to-tr from-sky-800 to-black text-white flex flex-col p-6 transition-transform duration-300 max-w-96 w-full">
        <>
          <h2 className="text-2xl font-bold mb-4">Workspaces</h2>
          <div className="flex-1 overflow-y-auto flex flex-wrap gap-4">
            {workspaces && workspaces.length > 0 ? (
              <Workspaces workspaces={workspaces} />
            ) : (
              <p>No workspaces found.</p>
            )}
          </div>
          <Button
            className="mt-4 bg-gray-100 text-black font-bold hover:bg-gray-200"
            onClick={handleCreateWorkspace}
          >
            Create Workspace
          </Button>
        </>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="w-full text-white p-4 flex justify-end items-center">
          <LogOut />
        </header>
        <div className="flex-1 flex flex-col justify-center items-center gap-6 p-6">
          <Alerts />
          <h1 className="text-4xl text-white font-bold">Hello, have a great day!</h1>
          <div className="text-center">
            <p className="text-white mb-2">Also, fun dog fact:</p>
            <p className="max-w-md bg-white text-black rounded p-4">{fact}</p>
          </div>
        </div>
      </main>

      {/* Dialog for Creating Workspace */}
      <Dialog open={showCreateWorkspace} onOpenChange={handleCreateWorkspace}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">Create Workspace</DialogTitle>
            <DialogDescription>Fill in the details to create a new workspace.</DialogDescription>
          </DialogHeader>
          <CreateWorkspaceForm closeForm={handleCloseForm} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
