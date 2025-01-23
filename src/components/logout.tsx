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
        message: "Logged out successfully",
        severity: "info"
      })
    )
    navigate("/")
  }

  return (
    <div>
      <Button className="bg-gray-200 text-gray-900 font-bold hover:bg-gray-100" onClick={handleLogout}>Log out</Button>
    </div>
  )
}
