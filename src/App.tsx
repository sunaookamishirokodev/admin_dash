import { HelmetProvider } from "react-helmet-async"
import AppRouter from "./routes/AppRouter"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect, useState } from "react"
import { User, UserRole } from "./types/user.type"
import http from "./utils/http"

function App() {
  const [user, setUser] = useState<undefined | null | User>(undefined)

  useEffect(() => {
    http
      .get<{ data: User }>("/users/@me")
      .then((res) => {
        if (res.data.data.roles.includes(UserRole.administrator)) {
          setUser(res.data.data)
        } else {
          setUser(null)
        }
      })
      .catch((err) => {
        console.error(err)
        setUser(null)
      })
  }, [])

  if (user === null) {
    return (location.href = "http://localhost:6001")
  } else {
    const useRouter = AppRouter()
    return (
      <HelmetProvider>
        {useRouter}
        <ToastContainer />
      </HelmetProvider>
    )
  }
}

export default App
