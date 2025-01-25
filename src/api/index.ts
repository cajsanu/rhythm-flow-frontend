import axios from "axios"

const baseURL = import.meta.env.BACKEND_URL

const api = axios.create({
  baseURL
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 500) {
      throw new Error(error.response.data)
    }
  }
)

export default api
