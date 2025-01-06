import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import userRequests from "../api/users"
import workspaceRequests from "../api/workspaces"
import { User } from "../types/user"
import { useParams } from "react-router-dom"

export const Home = () => {
  const [users, setUsers] = useState<User[]>([])

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await userRequests.getUsers()
        users && setUsers(users)
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()
  }, [])

  console.log("USERS", users)

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

      <Button onClick={handleGetWorkspaces}>Get Workspaces</Button>
    </div>
  )
}
