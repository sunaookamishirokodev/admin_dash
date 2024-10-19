import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import { branchAPI } from "src/apis/branch.api"
import { TypeBranch } from "src/types/branches.type"

export default function DetailBranch() {
  const { nameId } = useParams()

  const getBranchDetailQuery = useQuery({
    queryKey: ["branchDetail", nameId],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return branchAPI.detailBranch(nameId as string)
    }
  })
  const branchDetailData = getBranchDetailQuery.data?.data as TypeBranch

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="py-4 px-6 relative">
      <Helmet>
        <title>Chi tiết chi nhánh</title>
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
        <span className="text-sm text-[#3a86ff]">Thông tin chi nhánh</span>
      </div>

      {!getBranchDetailQuery.isFetching && (
        <form className="mt-2 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Thông tin chi tiết</h2>

          <div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Mã chi nhánh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-[200px] p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={branchDetailData.id}
                  readOnly
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Tên Chi Nhánh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={branchDetailData.name}
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Thương Hiệu:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                defaultValue={branchDetailData.trademark}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mô tả:</label>
              <textarea
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded outline-none text-sm resize-none"
                defaultValue={branchDetailData.description}
                rows={10} // Bạn có thể thay đổi số dòng theo ý muốn
                readOnly
              />
            </div>

            <div className="mb-4 w-full md:w-[300px]">
              <label className="block text-sm font-medium text-gray-700">URL:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                defaultValue={branchDetailData.url}
                readOnly
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Tỉnh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={branchDetailData.province}
                  readOnly
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Phường:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={branchDetailData.ward}
                  readOnly
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Địa Chỉ:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                defaultValue={branchDetailData.location}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tiện Nghi:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                defaultValue={branchDetailData.best_comforts}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Hình Ảnh:</label>
              <div className="flex items-center gap-2">
                {branchDetailData.images.map((img) => (
                  <div key={img}>
                    <img src={img} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
