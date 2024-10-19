import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { path } from "src/constants/path"
import { TypeUser } from "src/types/branches.type"
import { toast } from "react-toastify"
import { userAPI } from "src/apis/user.api"
import { Helmet } from "react-helmet-async"

type FormData = TypeUser

export default function UpdateUser() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { state } = useLocation()

  const { nameId } = useParams()

  const getUserDetailQuery = useQuery({
    queryKey: ["userDetail", nameId],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return userAPI.detailUser(nameId as string)
    }
  })
  const userDetailData = getUserDetailQuery.data?.data as TypeUser

  const updateUserMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: TypeUser }) => {
      return userAPI.updateUser({ id, body }) // Gọi hàm updateBranch với đối tượng chứa id và body
    }
  })

  const { handleSubmit, register, reset } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    const body = {
      email: data.email,
      phone: data.phone,
      fullname: data.fullname,
      nationality: data.nationality,
      last_booking: data.last_booking,
      nights: data.nights,
      books: data.books,
      create_at: data.create_at,
      update_at: String(new Date()),
      roles: data.roles
    }

    updateUserMutation.mutate(
      { id: nameId as string, body },
      {
        onSuccess: () => {
          toast.success("Cập nhật người dùng thành công")
          navigate(path.listUser)
          queryClient.invalidateQueries({ queryKey: ["userList", state] })
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    )
  })

  const handleBack = () => {
    navigate(-1)
  }

  const handleClear = () => {
    reset({
      email: "",
      phone: "",
      fullname: "",
      nationality: "",
      last_booking: "",
      nights: null,
      books: null,
      create_at: "",
      update_at: "",
      roles: []
    })
  }

  return (
    <div className="py-4 px-6 relative">
      <Helmet>
        <title>Cập nhật người dùng</title>
        <meta name="description" content="Quản lý người dùng" />
      </Helmet>

      <div className="flex items-center gap-1">
        <button onClick={handleBack} className="text-sm flex items-center hover:text-gray-400 duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Trở lại
        </button>
        <h1 className="ml-1 text-base uppercase text-gray-600 font-semibold hidden md:block">Quản lý người dùng</h1>
        <span className="text-sm text-[#6c757d]"> / </span>
        <span className="text-sm text-[#3a86ff]">Cập nhật thông tin người dùng</span>
      </div>

      {!getUserDetailQuery.isFetching && (
        <form onSubmit={onSubmit} className="mt-2 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Cập nhật thông tin</h2>

          <div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Mã người dùng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  {...register("id")}
                  defaultValue={userDetailData.id}
                  readOnly
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Tên người dùng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={userDetailData.fullname}
                  {...register("fullname")}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                defaultValue={userDetailData.phone}
                {...register("phone")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                defaultValue={userDetailData.email}
                {...register("email")}
              />
            </div>

            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Quốc tịch:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                defaultValue={userDetailData.nationality}
                {...register("nationality")}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[250px]">
                <label className="block text-sm font-medium text-gray-700">Thời gian đặt phòng gần nhất:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={userDetailData.last_booking}
                  {...register("last_booking")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số đêm đã đặt:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={userDetailData.nights as number}
                  {...register("nights")}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số lần đặt phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={userDetailData.books as number}
                  {...register("books")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Vai trò:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={userDetailData.roles}
                  {...register("roles")}
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={handleClear}
                type="button"
                className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 duration-200 text-sm"
              >
                Xóa
              </button>
              <button
                type="submit"
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 duration-200 text-sm"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
