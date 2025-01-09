export const getAuthConfig = () => {
  const token = window.localStorage.getItem("token")
  if (!token) {
    throw new Error("No token found")
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return config
}
