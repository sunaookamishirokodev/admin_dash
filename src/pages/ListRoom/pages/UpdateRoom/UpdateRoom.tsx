import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { path } from "src/constants/path"
import { TypeRoom } from "src/types/branches.type"
import { toast } from "react-toastify"
import { roomAPI } from "src/apis/room.api"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"

type FormData = TypeRoom

export default function UpdateRoom() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { state } = useLocation()

  const { nameId } = useParams()

  const getRoomDetailQuery = useQuery({
    queryKey: ["branchDetail", nameId],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return roomAPI.detailRoom(nameId as string)
    }
  })
  const roomDetailData = getRoomDetailQuery.data?.data as TypeRoom

  const updateRoomMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: TypeRoom }) => {
      return roomAPI.updateRoom({ id, body }) // Gọi hàm updateBranch với đối tượng chứa id và body
    }
  })

  const { handleSubmit, register, reset } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    const body = {
      branch_id: data.branch_id, // ID của chi nhánh mà phòng thuộc về
      price_per_night: data.price_per_night, // Giá mỗi đêm
      price_per_month: data.price_per_month, // Giá mỗi tháng
      name: data.name, // Tên phòng
      description: data.description, // Mô tả phòng (mảng các chuỗi)
      comforts: data.comforts, // Danh sách các tiện nghi (mảng các chuỗi)
      bed_type: data.bed_type, // Loại giường
      booking_turn: data.booking_turn, // Số lần đặt phòng
      stock: data.stock, // Số lượng phòng còn lại
      acreage: data.acreage, // Diện tích phòng (m2)
      available_from: data.available_from, // Thời gian có sẵn (ISO 8601)
      available_to: data.available_to, // Thời gian không còn sẵn (ISO 8601)
      max_adults: data.max_adults, // Số người lớn tối đa
      max_children: data.max_children, // Số trẻ em tối đa
      max_babies: data.max_babies, // Số trẻ sơ sinh tối đa
      images: roomDetailData.images // Giả sử bạn không muốn thay đổi hình ảnh
    }

    updateRoomMutation.mutate(
      { id: nameId as string, body },
      {
        onSuccess: () => {
          toast.success("Cập nhật chi nhánh thành công")
          navigate(path.listRoom)
          queryClient.invalidateQueries({ queryKey: ["roomList", state] })
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
      branch_id: "", // ID của chi nhánh mà phòng thuộc về
      price_per_night: null, // Giá mỗi đêm
      price_per_month: null, // Giá mỗi tháng
      name: "", // Tên phòng
      description: [], // Mô tả phòng (mảng các chuỗi)
      comforts: [], // Danh sách các tiện nghi (mảng các chuỗi)
      bed_type: "", // Loại giường
      booking_turn: null, // Số lần đặt phòng
      stock: null, // Số lượng phòng còn lại
      acreage: null, // Diện tích phòng (m2)
      available_from: "", // Thời gian có sẵn (ISO 8601)
      available_to: "", // Thời gian không còn sẵn (ISO 8601)
      max_adults: null, // Số người lớn tối đa
      max_children: null, // Số trẻ em tối đa
      max_babies: null // Số trẻ sơ sinh tối đa
    })
  }

  return (
    <div className="py-4 px-6 relative">
      <Helmet>
        <title>Cập nhật phòng</title>
        <meta name="description" content="Quản lý phòng" />
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
        <h1 className="ml-1 text-base uppercase text-gray-600 font-semibold hidden md:block">Quản lý phòng</h1>
        <span className="text-sm text-[#6c757d]"> / </span>
        <span className="text-sm text-[#3a86ff]">Cập nhật thông tin phòng</span>
      </div>

      {!getRoomDetailQuery.isFetching && (
        <form onSubmit={onSubmit} className="mt-2 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Cập nhật thông tin</h2>

          <div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Mã phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.id}
                  readOnly
                  {...register("id")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Mã chi nhánh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.branch_id}
                  {...register("branch_id")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Tên phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.name}
                  {...register("name")}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Giá mỗi đêm:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.price_per_night as number}
                  {...register("price_per_night")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Giá mỗi tháng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.price_per_month as number}
                  {...register("price_per_month")}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mô tả:</label>
              <textarea
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none resize-none"
                defaultValue={roomDetailData.description}
                rows={10} // Cố định 10 dòng
                {...register("description")}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Loại giường:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.bed_type}
                  {...register("bed_type")}
                />
              </div>
              <div className="mb-4 w-full md:w-[300px]">
                <label className="block text-sm font-medium text-gray-700">Danh sách tiện nghi:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.comforts}
                  {...register("comforts")}
                />
              </div>
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Diện tích phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.acreage as number}
                  {...register("acreage")}
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
                  defaultValue={roomDetailData.booking_turn as number}
                  {...register("booking_turn")}
                />
              </div>
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số lượng phòng còn lại:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.stock as number}
                  {...register("stock")}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Thời gian có sẵn:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.available_from}
                  {...register("available_from")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Thời gian không có sẵn:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.available_to}
                  {...register("available_to")}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số người lớn tối đa:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.max_adults as number}
                  {...register("max_adults")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số trẻ em tối đa:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.max_children as number}
                  {...register("max_children")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số trẻ sơ sinh tối đa:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData.max_babies as number}
                  {...register("max_babies")}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Hình Ảnh:</label>
              <div className="flex items-center gap-2">
                {roomDetailData.images.map((img) => (
                  <div key={img}>
                    <img src={img} />
                  </div>
                ))}
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
