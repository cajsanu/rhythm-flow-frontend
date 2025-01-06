import { Button } from "../components/ui/button"
import workspaceRequests from "../api/workspaces"
import { useParams } from "react-router-dom"

export const Home = () => {
  const { id } = useParams<{ id: string }>()

  const handleGetWorkspaces = async () => {
    try {
      if (id) {
        const workspaces = await workspaceRequests.getMyWorkspaces(id)
        console.log("WORKSPACES", workspaces)
      } else {
        console.log("No ID provided")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-2xl">Welcome!</h1>

      <Button onClick={handleGetWorkspaces}>My Workspaces</Button>
    </div>
  )
}
