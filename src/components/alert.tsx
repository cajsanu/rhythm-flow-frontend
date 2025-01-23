import { useAppSelector } from "@/hooks/alertManagement"
import { cn } from "@/lib/utils"

export const Alerts = () => {
  const { message, severity } = useAppSelector((state) => state.alert)

  if (!message) return null

  const alertStyles = {
    success: "bg-green-100 text-green-700 border-green-500",
    error: "bg-red-100 text-red-700 border-red-500",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-500",
    info: "bg-blue-100 text-blue-700 border-blue-500"
  }

  return (
    <div
      role="alert"
      className={cn(
        "p-4 border-l-4 rounded-md shadow-md",
        alertStyles[severity] || "bg-gray-100 text-gray-700 border-gray-500"
      )}
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
