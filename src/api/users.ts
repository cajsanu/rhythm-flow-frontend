import axios from "axios"
const baseURL = "/api/v1/users"

const getUsers = async () => {
  try {
    const res = await axios.get(baseURL)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default { getUsers }
