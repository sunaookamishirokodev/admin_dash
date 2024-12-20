import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { branchAPI } from "src/apis/branch.api"
import { path } from "src/constants/path"
import { TypeBranch } from "src/types/branches.type"

type FormData = TypeBranch

export default function CreateBranch() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [comforts, setComforts] = useState<string[]>([])
  const [comfortInput, setComfortInput] = useState<string>("")

  const { handleSubmit, register, reset, setValue } = useForm<FormData>()
  const [images, setImages] = useState<string[]>([])

  const createBranchMutation = useMutation({
    mutationFn: (body: FormData) => {
      return branchAPI.createBranch(body)
    }
  })

  const onSubmit = handleSubmit((data) => {
    createBranchMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Tạo chi nhánh thành công")
        navigate(path.listBranch)
        queryClient.invalidateQueries({ queryKey: ["branchList", state] })
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  })

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
        <title>Thêm chi nhánh</title>
        <meta name="description" content="Quản lý chi nhánh" />
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
        <h1 className="ml-1 text-base uppercase text-gray-600 font-semibold hidden md:block">Quản lý chi nhánh</h1>
        <span className="text-sm text-[#6c757d]"> / </span>
        <span className="text-sm text-[#3a86ff]">Thêm chi nhánh</span>
      </div>

      <form onSubmit={onSubmit} className="mt-2 p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Thêm Chi Nhánh</h2>

        <div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Tên Chi Nhánh:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                {...register("name")}
              />
            </div>
          </div>

          <div className="mb-4 w-full md:w-[200px]">
            <label className="block text-sm font-medium text-gray-700">Thương Hiệu:</label>
            <input
              type="text"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
              {...register("trademark")}
            />
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

          <div className="mb-4 w-full md:w-[300px]">
            <label className="block text-sm font-medium text-gray-700">URL:</label>
            <input
              type="text"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
              {...register("url")}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Tỉnh:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                {...register("province")}
              />
            </div>

            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Phường:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                {...register("ward")}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Địa Chỉ:</label>
            <input
              type="text"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
              {...register("location")}
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
                  <input type="hidden" value={comfort} {...register(`best_comforts.${index}`)} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Hình Ảnh:</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                multiple
                accept="image/*"
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
              Thêm Chi Nhánh
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
