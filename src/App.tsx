import { HelmetProvider } from "react-helmet-async"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AppRouter from "./routes/AppRouter"

function App() {
  // const [user, setUser] = useState<undefined | null | User>(undefined)

  // useEffect(() => {
  //   http
  //     .get<{ data: User }>("/users/@me")
  //     .then((res) => {
  //       if (res.data.data.roles.includes(UserRole.administrator)) {
  //         setUser(res.data.data)
  //       } else {
  //         setUser(null)
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //       setUser(null)
  //     })
  // }, [])

  // if (user === null) {
  // return (location.href = "https://manorlife.vn")
  // } else {
  const useRouter = AppRouter()
  return (
    <HelmetProvider>
      {useRouter}
      <ToastContainer />
    </HelmetProvider>
  )
  // }
}

export default App
