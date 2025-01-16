import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = 'http://localhost:5125/api/v1'

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'http://localhost:5125/api/v1'
}

const api = axios.create({
  baseURL
})

// setupinterceptors (put logic in  another file and give api to it)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 500) {
      throw new Error(error.response.data)
    }
  }
)

export default api
