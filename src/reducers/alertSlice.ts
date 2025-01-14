import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "../store"

type Severity = "success" | "error"

export type Alert = {
  message: string
  severity: Severity
}

const initialState: Alert = {
  message: "",
  severity: "success"
}

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    createAlert(state, action: PayloadAction<Alert>) {
      state.message = action.payload.message
      state.severity = action.payload.severity
    },
    clearAlert(state) {
      state.message = ""
    }
  }
})

export const { createAlert, clearAlert } = alertSlice.actions

export const timedAlert = ({ message, severity }: Alert) => {
  return async (dispatch: AppDispatch) => {
    dispatch(createAlert({ message, severity }))
    setTimeout(() => {
      dispatch(clearAlert())
    }, 5000)
  }
}

export default alertSlice.reducer
