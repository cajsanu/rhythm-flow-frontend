import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import userRequests from "../api/users"
import { User } from "../types/user"

export const Home = () => {
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState<User[]>([])

  const userId = "a9748d6b-c4af-4670-8902-da4b619acc92"

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

  const handleWelcome = () => {
    setMessage("Why did you?")
  }
  const handleCleanState = () => {
    setMessage("")
  }

  const handleGetUser = async () => {
    try {
      const user = await userRequests.getUserById(userId)
      console.log("USER", user)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-2xl">Welcome!</h1>
      {message && <p>{message}</p>}
      {!message ? (
        <Button onClick={handleWelcome}>Do not click me</Button>
      ) : (
        <Button onClick={handleCleanState}>Undo the damage</Button>
      )}
      <Button onClick={handleGetUser}>Get User</Button>
    </div>
  )
}
