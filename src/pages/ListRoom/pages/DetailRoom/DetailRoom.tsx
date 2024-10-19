import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import { roomAPI } from "src/apis/room.api"
import { TypeRoom } from "src/types/branches.type"

export default function DetailRoom() {
  const { nameId } = useParams()

  const getRoomDetailQuery = useQuery({
    queryKey: ["roomDetail", nameId],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return roomAPI.detailRoom(nameId as string)
    }
  })
  const roomDetailData = getRoomDetailQuery.data?.data as TypeRoom

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="py-4 px-6 relative">
      <Helmet>
        <title>Chi tiết phòng</title>
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
        <span className="text-sm text-[#3a86ff]">Thông tin phòng</span>
      </div>

      {!getRoomDetailQuery.isFetching && (
        <form className="mt-2 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Thông tin chi tiết</h2>

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
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Mã chi nhánh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.branch_id}
                  readOnly
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Tên phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.name}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Giá mỗi đêm:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.price_per_night as number}
                  readOnly
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Giá mỗi tháng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.price_per_month as number}
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mô tả:</label>
              <textarea
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none resize-none"
                defaultValue={roomDetailData.description}
                rows={10} // Cố định 10 dòng
                readOnly // Không cho phép chỉnh sửa nội dung
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Loại giường:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.bed_type}
                  readOnly
                />
              </div>
              <div className="mb-4 w-full md:w-[300px]">
                <label className="block text-sm font-medium text-gray-700">Danh sách tiện nghi:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.comforts}
                  readOnly
                />
              </div>
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Diện tích phòng:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.acreage as number}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số lần đặt phòng:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.booking_turn as number}
                  readOnly
                />
              </div>
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số lượng phòng còn lại:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.stock as number}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Thời gian có sẵn:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.available_from}
                  readOnly
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Thời gian không có sẵn:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.available_to}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số người lớn tối đa:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.max_adults as number}
                  readOnly
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số trẻ em tối đa:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.max_children as number}
                  readOnly
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Số trẻ sơ sinh tối đa:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.max_babies as number}
                  readOnly
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
          </div>
        </form>
      )}
    </div>
  )
}
