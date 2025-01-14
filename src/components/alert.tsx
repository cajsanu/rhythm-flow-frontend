import Alert from "@mui/material/Alert"
import { Box } from "@mui/system"
import { useAppSelector } from "@/hooks/alertManagement"

export const Alerts = () => {
  const { message, severity } = useAppSelector((state) => state.alert)

  if (message) {
    return (
      <Box>
        <Alert severity={severity}>{message}</Alert>
      </Box>
    )
  }
}
