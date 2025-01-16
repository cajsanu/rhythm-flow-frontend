export const getAuthConfig = () => {
  const token = window.localStorage.getItem("token")
  if (!token) {
    window.location.href = "/"
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return config
}
