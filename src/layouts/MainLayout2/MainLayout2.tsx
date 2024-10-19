import { Outlet } from "react-router-dom"
import Header from "src/components/Header"

export default function MainLayout2() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
