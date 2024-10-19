import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { userAPI } from "src/apis/user.api"
import Pagination from "src/components/Pagination"
import { path } from "src/constants/path"
import { TypeUser } from "src/types/branches.type"

export default function ListUser() {
  const [currentPage, setCurrentPage] = useState(1)
  const queryClient = useQueryClient()

  const getUserListQuery = useQuery({
    queryKey: ["userList", currentPage],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return userAPI.getUsers(controller.signal)
    },
    retry: 1, // số lần fetch lại khi thất bại
    placeholderData: keepPreviousData, // giữ data cũ
    staleTime: 5 * 60 * 1000 // dưới 5 phút không refetch api
  })

  const listRoom = (getUserListQuery.data?.data as TypeUser[]) || []

  const totalItem = 5
  const startIndex = (currentPage - 1) * totalItem
  const endIndex = startIndex + totalItem
  const currentList = listRoom.slice(startIndex, endIndex)

  const handleChangePage = (numberPage: number) => {
    setCurrentPage(numberPage)
  }

  const navigate = useNavigate()

  const handleUpdateUser = (id: string) => {
    navigate(`${path.listUser}/edit/${id}`, {
      state: currentPage
    })
  }

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => {
      return userAPI.deleteUser(id)
    }
  })

  const handleDeleteUser = (id: string) => {
    deleteUserMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Xóa người dùng thành công")
        queryClient.invalidateQueries({ queryKey: ["userList", currentPage] })
      }
    })
  }

  return (
    <div className="py-4 px-6">
      <Helmet>
        <title>Quản lý người dùng</title>
        <meta name="description" content="Quản lý người dùng" />
      </Helmet>

      <div className="flex items-center gap-1">
        <h1 className="text-base uppercase text-gray-600 font-semibold">Quản lý người dùng</h1>
        <span className="text-sm text-[#6c757d]"> / </span>
        <span className="text-sm text-[#3a86ff]">Danh sách người dùng</span>
      </div>

      <div className="mt-4 p-4 bg-white">
        <div className="flex items-center justify-between">
          <form>
            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Nhập tên người dùng hoặc mã người dùng"
                className="w-[300px] outline-none p-2 border-2 border-[#3a86ff] border-r-0 rounded-tl-full rounded-bl-full text-sm"
              />
              <button className="bg-[#3a86ff] rounded-tr-full rounded-br-full py-2 px-3 border-2 border-[#3a86ff]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 w-full border border-gray-200 border-b-0">
          <div className="bg-[#e9ecef] grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <div className="py-2 px-4 border-b text-sm text-center col-span-1">Mã người dùng</div>
            <div className="py-2 px-4 border-b text-sm text-center col-span-1">Tên người dùng</div>
            <div className="py-2 px-4 border-b text-sm text-center hidden col-span-0 lg:block lg:col-span-1">Email</div>
            <div className="py-2 px-4 border-b text-sm text-center hidden col-span-0 lg:block lg:col-span-1">
              Quốc tịch
            </div>
            <div className="py-2 px-4 border-b text-sm text-center hidden col-span-0 md:block md:col-span-1">
              Vai trò
            </div>
            <div className="py-2 px-4 border-b text-sm text-center col-span-1">Thao tác</div>
          </div>
          <div className="w-full">
            {!getUserListQuery.isFetching &&
              currentList.map((item) => (
                <div key={item.id} className="border-b border-b-gray-300 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  <div className="border-r border-r-gray-300 py-2 px-4 text-center text-sm col-span-1">{item.id}</div>
                  <div className="border-r border-r-gray-300 py-2 px-4 text-center text-sm col-span-1 truncate">
                    {item.fullname}
                  </div>
                  <div className="border-r border-r-gray-300 py-2 px-4 text-center text-sm hidden col-span-0 lg:block lg:col-span-1 truncate">
                    {item.email}
                  </div>
                  <div className="border-r border-r-gray-300 py-2 px-4 text-center text-sm hidden col-span-0 lg:block lg:col-span-1">
                    {item.nationality}
                  </div>
                  <div className="border-r border-r-gray-300 py-2 px-4 text-center text-sm hidden col-span-0 md:block md:col-span-1">
                    {item.roles}
                  </div>
                  <div className="py-2 px-4 text-center lg:col-span-1">
                    <div className="flex items-center justify-center gap-2 ">
                      <button onClick={() => handleUpdateUser(item.id as string)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="green"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                      <Link to={`${path.listUser}/detail/${item.id}`}>
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
                            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </Link>
                      <button onClick={() => handleDeleteUser(item.id as string)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="red"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="my-4 flex justify-center">
          <Pagination
            totalOfPage={totalItem}
            totalAllPage={listRoom.length}
            currentPage={currentPage}
            onChangePage={handleChangePage}
          />
        </div>
      </div>
    </div>
  )
}
