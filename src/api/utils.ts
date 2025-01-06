export const getAuthConfig = () => {
    let token = window.localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    return config
  }