import { path } from "src/constants/path"
import { Link } from "react-router-dom"
import logoSideBar from "src/img/SideBar/logo.jpg"

export default function SidebarMenu() {
  return (
    <div className="bg-[#fff] w-full py-4 px-6 sticky left-0 top-0 h-screen border border-gray-300 shadow-md">
      <div className="flex justify-center">
        <Link to={path.home} className="w-[200px] h-[80px]">
          <img src={logoSideBar} alt="logo sidebar" className="w-full h-full object-contain" />
        </Link>
      </div>

      <div className="mt-4">
        <span className="text-gray-400 text-sm py-2 uppercase">Quản lý</span>
        <nav className="mt-2">
          <div>
            <Link
              to={path.listBranch}
              className="text-[#023047] text-sm py-2 flex items-center gap-2 hover:opacity-50 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Quản lý chi nhánh
            </Link>
          </div>
          <div>
            <Link
              to={path.listRoom}
              className="text-[#023047] text-sm py-2 flex items-center gap-2 hover:opacity-50 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                />
              </svg>
              Quản lý phòng
            </Link>
          </div>
          <div>
            <Link
              to={path.listUser}
              className="text-[#023047] text-sm py-2 flex items-center gap-2 hover:opacity-50 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Quản lý người dùng
            </Link>
          </div>
          <div>
            <Link
              to={path.listBooking}
              className="text-[#023047] text-sm py-2 flex items-center gap-2 hover:opacity-50 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                />
              </svg>
              Quản lý đặt phòng
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
