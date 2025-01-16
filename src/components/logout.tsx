import { useAppDispatch } from "@/hooks/alertManagement"
import { timedAlert } from "@/reducers/alertSlice"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

export const LogOut = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(
      timedAlert({
        message: "Logout successful",
        severity: "success"
      })
    )
    navigate("/")
  }

  return (
    <div>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  )
}
