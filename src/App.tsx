import { HelmetProvider } from "react-helmet-async"
import AppRouter from "./routes/AppRouter"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const useRouter = AppRouter()
  return (
    <HelmetProvider>
      {useRouter}
      <ToastContainer />
    </HelmetProvider>
  )
}

export default App
