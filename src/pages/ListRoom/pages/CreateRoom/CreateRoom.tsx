import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { roomAPI } from "src/apis/room.api"
import { path } from "src/constants/path"
import { TypeRoom } from "src/types/branches.type"

export type FormData = TypeRoom

export default function CreateRoom() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { state } = useLocation()

  const { handleSubmit, register, reset, setValue } = useForm<FormData>()
  const [images, setImages] = useState<string[]>([])

  const createRoomMutation = useMutation({
    mutationFn: (body: FormData) => {
      return roomAPI.createRoom(body)
    }
  })

  const onSubmit = handleSubmit((data) => {
    createRoomMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Tạo phòng thành công")
        navigate(path.listRoom)
        queryClient.invalidateQueries({ queryKey: ["roomList", state] })
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  })

  const handleClear = () => {
    reset()
    setImages([])
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []) // Lấy danh sách tệp
    const imageFiles = files.map((file) => URL.createObjectURL(file)) // Tạo URL tạm cho hình ảnh
    setImages((prev) => {
      const updatedImages = [...prev, ...imageFiles]
      setValue("images", updatedImages) // Lưu vào useForm
      return updatedImages
    })
    event.target.value = "" // Đặt lại giá trị của input file để cho phép chọn lại cùng một tệp
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index)) // Xóa hình ảnh khỏi mảng
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="py-4 px-6">
      <Helmet>
        <title>Thêm phòng</title>
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
        <span className="text-sm text-[#3a86ff]">Thêm phòng</span>
      </div>

      <form onSubmit={onSubmit} className="mt-2 p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Thêm Phòng</h2>

        <div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Mã phòng:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                {...register("id")}
              />
            </div>

            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Mã chi nhánh:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                {...register("branch_id")}
              />
            </div>

            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Tên phòng:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
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
                {...register("price_per_night")}
              />
            </div>

            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Giá mỗi tháng:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                {...register("price_per_month")}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mô tả:</label>
            <textarea
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
              rows={10}
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
                {...register("bed_type")}
              />
            </div>
            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Danh sách tiện nghi:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                {...register("comforts")}
              />
            </div>
            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Diện tích phòng:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
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
                {...register("booking_turn")}
              />
            </div>
            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Số lượng phòng còn lại:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
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
                {...register("available_from")}
              />
            </div>

            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Thời gian không có sẵn:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
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
                {...register("max_adults")}
              />
            </div>

            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Số trẻ em tối đa:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                {...register("max_children")}
              />
            </div>

            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Số trẻ sơ sinh tối đa:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                {...register("max_babies")}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Hình Ảnh:</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                multiple // Cho phép chọn nhiều tệp
                accept="image/*" // Chỉ cho phép hình ảnh
                onChange={handleImageChange}
                className="mt-1 block w-[300px] p-2 border border-gray-300 rounded text-sm"
              />
              <button type="button" className="underline text-blue-500 text-sm">
                Thêm
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={handleClear}
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 duration-200 text-sm"
            >
              Xóa
            </button>
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 duration-200 text-sm"
            >
              Thêm Phòng
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
