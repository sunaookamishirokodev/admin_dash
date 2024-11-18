import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { branchAPI } from "src/apis/branch.api"
import { path } from "src/constants/path"
import { TypeBranch } from "src/types/branches.type"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet-async"
import getMedia from "src/utils/getMedia"
import { useEffect, useState } from "react"

type FormData = TypeBranch

export default function UpdateBranch() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { nameId } = useParams()
  const [comforts, setComforts] = useState<string[]>([])
  const [comfortInput, setComfortInput] = useState<string>("")
  const [previousImages, setPreviousImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<File[]>([])

  const getBranchDetailQuery = useQuery({
    queryKey: ["branchDetail", nameId],
    queryFn: () => branchAPI.detailBranch(nameId as string)
  })
  
  const branchDetailData = getBranchDetailQuery.data?.data?.data

  useEffect(() => {
    setPreviousImages((branchDetailData?.images as string[]) ?? [])
    setComforts(branchDetailData?.best_comforts ?? [])
  }, [branchDetailData])

  const handleAddComfort = () => {
    if (comfortInput.trim() !== "") {
      setComforts([...comforts, comfortInput])
      setComfortInput("")
    }
  }

  const handleDeleteComfort = (index: number) => {
    setComforts(comforts.filter((_, i) => i !== index))
  }

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

  const updateBranchMutation = useMutation({
    mutationFn: ({ body }: { body: TypeBranch }) => branchAPI.updateBranch({ body })
  })

  const { handleSubmit, register, reset } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    const body: TypeBranch = {
      ...data,
      branch_id: nameId,
      best_comforts: comforts,
      images: [...previousImages, ...newImages]
    }

    updateBranchMutation.mutate(
      { body },
      {
        onSuccess: () => {
          toast.success("Cập nhật chi nhánh thành công")
          navigate(path.listBranch)
          queryClient.invalidateQueries({ queryKey: ["branchList", state] })
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    )
  })

  const handleBack = () => navigate(-1)
  const handleClear = () =>
    reset({
      name: "",
      trademark: "",
      url: "",
      province: "",
      ward: "",
      location: "",
      best_comforts: [],
      description: []
    })

  return (
    <div className="py-4 px-6 relative">
      <Helmet>
        <title>Cập nhật chi nhánh</title>
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
        <span className="text-sm text-[#3a86ff]">Cập nhật thông tin chi nhánh</span>
      </div>

      <div className="mt-2 p-4 bg-white rounded shadow-md relative">
        {!getBranchDetailQuery.isFetching && (
          <form onSubmit={onSubmit}>
            <h2 className="text-xl font-bold mb-4">Cập nhật thông tin</h2>

            {/* <div> */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Mã chi nhánh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  {...register("branch_id")}
                  defaultValue={branchDetailData?.branch_id}
                  readOnly
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Tên Chi Nhánh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={branchDetailData?.name}
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
                defaultValue={branchDetailData?.trademark}
                {...register("trademark")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mô tả:</label>
              <textarea
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm resize-none"
                defaultValue={branchDetailData?.description}
                rows={10} // Bạn có thể thay đổi số dòng theo ý muốn
                {...register("description")}
              />
            </div>

            <div className="mb-4 w-full md:w-[300px]">
              <label className="block text-sm font-medium text-gray-700">URL:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                defaultValue={branchDetailData?.url}
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
                  defaultValue={branchDetailData?.province}
                  {...register("province")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Phường:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={branchDetailData?.ward}
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
                defaultValue={branchDetailData?.location}
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
          </form>
        )}
      </div>
    </div>
  )
}
