import { path } from "src/constants/path"
import { lazy, Suspense } from "react"
import { useRoutes } from "react-router-dom"
import MainLayout from "src/layouts/MainLayout"
import MainLayout2 from "src/layouts/MainLayout2"
import ListBooking from "src/pages/ListBooking"
import UpdateBooking from "src/pages/ListBooking/pages/UpdateBooking"
import DetailBooking from "src/pages/ListBooking/pages/DetailBooking"

const ListBranch = lazy(() => import("../pages/ListBranch"))
const CreateBranch = lazy(() => import("../pages/ListBranch/pages/CreateBranch"))
const UpdateBranch = lazy(() => import("../pages/ListBranch/pages/UpdateBranch"))
const DetailBranch = lazy(() => import("../pages/ListBranch/pages/DetailBranch"))

const ListRoom = lazy(() => import("../pages/ListRoom"))
const CreateRoom = lazy(() => import("../pages/ListRoom/pages/CreateRoom"))
const UpdateRoom = lazy(() => import("../pages/ListRoom/pages/UpdateRoom"))
const DetailRoom = lazy(() => import("../pages/ListRoom/pages/DetailRoom"))

const ListUser = lazy(() => import("../pages/ListUser"))
const UpdateUser = lazy(() => import("../pages/ListUser/pages/UpdateUser"))
const DetailUser = lazy(() => import("../pages/ListUser/pages/DetailUser"))

export default function AppRouter() {
  const useRouterApp = useRoutes([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <MainLayout2 />,
          children: [
            {
              path: path.home,
              index: true,
              element: (
                <Suspense>
                  <ListBranch />
                </Suspense>
              )
            },
            {
              path: path.listBranch,
              element: (
                <Suspense>
                  <ListBranch />
                </Suspense>
              )
            },
            {
              path: path.createBranch,
              index: true,
              element: (
                <Suspense>
                  <CreateBranch />
                </Suspense>
              )
            },
            {
              path: path.updateBranch,
              element: (
                <Suspense>
                  <UpdateBranch />
                </Suspense>
              )
            },
            {
              path: path.detailBranch,
              element: (
                <Suspense>
                  <DetailBranch />
                </Suspense>
              )
            },
            {
              path: path.listRoom,
              element: (
                <Suspense>
                  <ListRoom />
                </Suspense>
              )
            },
            {
              path: path.createRoom,
              element: (
                <Suspense>
                  <CreateRoom />
                </Suspense>
              )
            },
            {
              path: path.updateRoom,
              element: (
                <Suspense>
                  <UpdateRoom />
                </Suspense>
              )
            },
            {
              path: path.detailRoom,
              element: (
                <Suspense>
                  <DetailRoom />
                </Suspense>
              )
            },
            {
              path: path.listUser,
              element: (
                <Suspense>
                  <ListUser />
                </Suspense>
              )
            },
            {
              path: path.updateUser,
              element: (
                <Suspense>
                  <UpdateUser />
                </Suspense>
              )
            },
            {
              path: path.detailUser,
              element: (
                <Suspense>
                  <DetailUser />
                </Suspense>
              )
            },
            {
              path: path.listBooking,
              element: (
                <Suspense>
                  <ListBooking />
                </Suspense>
              )
            },
            {
              path: path.updateBooking,
              element: (
                <Suspense>
                  <UpdateBooking />
                </Suspense>
              )
            },
            {
              path: path.detailBooking,
              element: (
                <Suspense>
                  <DetailBooking />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return useRouterApp
}
