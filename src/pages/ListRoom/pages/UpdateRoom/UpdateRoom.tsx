import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { path } from "src/constants/path"
import { TypeRoom } from "src/types/branches.type"
import { toast } from "react-toastify"
import { roomAPI } from "src/apis/room.api"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import getMedia from "src/utils/getMedia"
import { format } from "date-fns"
import { useEffect, useState } from "react"

type FormData = TypeRoom

export default function UpdateRoom() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { nameId } = useParams()
  const [comforts, setComforts] = useState<string[]>([])
  const [comfortInput, setComfortInput] = useState<string>("")
  const [previousImages, setPreviousImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<File[]>([])

  const handleAddComfort = () => {
    if (comfortInput.trim() !== "") {
      setComforts([...comforts, comfortInput])
      setComfortInput("")
    }
  }

  const handleDeleteComfort = (index: number) => {
    const updatedComforts = comforts.filter((_, i) => i !== index)
    setComforts(updatedComforts)
  }

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
  const roomDetailData = getRoomDetailQuery.data?.data?.data

  useEffect(() => {
    setComforts(roomDetailData?.comforts ?? [])
    setPreviousImages((roomDetailData?.images as string[]) ?? [])
  }, [roomDetailData])

  const updateRoomMutation = useMutation({
    mutationFn: ({ body }: { body: TypeRoom }) => {
      return roomAPI.updateRoom({ body })
    }
  })

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages([...newImages, ...Array.from(e.target.files)])
    }
  }

  const handleDeletePreviousImage = (index: number) => {
    setPreviousImages(previousImages.filter((_, i) => i !== index))
  }

  const handleDeleteNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index))
  }

  const { handleSubmit, register, reset } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    const body: TypeRoom = {
      branch_id: data.branch_id,
      price_per_night: data.price_per_night,
      price_per_month: data.price_per_month,
      name: data.name,
      description: data.description,
      comforts: data.comforts,
      bed_type: data.bed_type,
      booking_turn: data.booking_turn,
      stock: data.stock,
      acreage: data.acreage,
      available_from: data.available_from,
      available_to: data.available_to,
      max_adults: data.max_adults,
      max_children: data.max_children,
      max_babies: data.max_babies,
      images: roomDetailData?.images || undefined
    }

    updateRoomMutation.mutate(
      { body },
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
      branch_id: "",
      price_per_night: 0,
      price_per_month: 0,
      name: "",
      description: [],
      comforts: [],
      bed_type: "",
      booking_turn: 0,
      stock: 0,
      acreage: 0,
      available_from: "",
      available_to: "",
      max_adults: 0,
      max_children: 0,
      max_babies: 0
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
                  defaultValue={roomDetailData?.room_id}
                  readOnly
                  {...register("branch_id")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Mã chi nhánh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData?.branch_id}
                  {...register("branch_id")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Tên phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData?.name}
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
                  defaultValue={roomDetailData?.price_per_night}
                  {...register("price_per_night")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Giá mỗi tháng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData?.price_per_month}
                  {...register("price_per_month")}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mô tả:</label>
              <textarea
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none resize-none"
                defaultValue={roomDetailData?.description.join(", ")}
                rows={10} // Cố định 10 dòng
                {...register("description")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tiện Nghi:</label>
              <div className="mt-1 flex items-center">
                <input
                  type="text"
                  value={comfortInput}
                  onChange={(e) => setComfortInput(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddComfort}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2">
                {comforts.map((comfort, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-sm">{comfort}</span>
                    <button type="button" onClick={() => handleDeleteComfort(index)} className="text-red-500 text-xs">
                      Delete
                    </button>
                    <input type="hidden" value={comfort} {...register(`comforts.${index}`)} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Loại giường:</label>
                <select
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  {...register("bed_type")}
                >
                  <option value="">Chọn loại giường</option>
                  <option value="single">Single</option>
                  <option value="king">King</option>
                </select>
              </div>
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Diện tích phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData?.acreage}
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
                  defaultValue={roomDetailData?.booking_turn}
                  {...register("booking_turn")}
                />
              </div>
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số lượng phòng còn lại:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData?.stock}
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
                  defaultValue={format(roomDetailData?.available_from || new Date(), "dd/MM/yyyy")}
                  {...register("available_from")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Thời gian không có sẵn:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={format(roomDetailData?.available_to || new Date(), "dd/MM/yyyy")}
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
                  defaultValue={roomDetailData?.max_adults}
                  {...register("max_adults")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số trẻ em tối đa:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData?.max_children}
                  {...register("max_children")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số trẻ sơ sinh tối đa:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={roomDetailData?.max_babies}
                  {...register("max_babies")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Hình Ảnh:</label>
              <input
                type="file"
                multiple
                onChange={handleAddImage}
                className="mb-4 block w-full text-sm border-gray-300 rounded"
              />

              <div className="flex gap-2 flex-wrap">
                {previousImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={getMedia(img)} className="h-20 w-20 object-cover" />
                    <button
                      onClick={() => handleDeletePreviousImage(index)}
                      type="button"
                      className="absolute top-0 right-0 text-red-500"
                    >
                      X
                    </button>
                  </div>
                ))}
                {newImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img src={URL.createObjectURL(file)} className="h-20 w-20 object-cover" alt="Preview" />
                    <button
                      onClick={() => handleDeleteNewImage(index)}
                      type="button"
                      className="absolute top-0 right-0 text-red-500"
                    >
                      X
                    </button>
                  </div>
                ))}
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
          </div>
        </form>
      )}
    </div>
  )
}
