import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import userRequests from "../api/users"

export function Home() {
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await userRequests.getUsers()
        setUsers(users)
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

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-2xl">Welcome!</h1>
      {message && <p>{message}</p>}
      {!message ? (
        <Button onClick={handleWelcome}>Do not click me</Button>
      ) : (
        <Button onClick={handleCleanState}>Undo the damage</Button>
      )}
    </div>
  )
}
