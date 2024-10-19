import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import { bookingAPI } from "src/apis/booking.api"
import { TypeBooking } from "src/types/branches.type"

export default function UpdateBooking() {
  const navigate = useNavigate()

  const { nameId } = useParams()

  const getBookingDetailQuery = useQuery({
    queryKey: ["bookingList", nameId],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return bookingAPI.detailBooking(nameId as string)
    }
  })
  const bookingDetailData = getBookingDetailQuery.data?.data as TypeBooking

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="py-4 px-6 relative">
      <Helmet>
        <title>Chi tiết đặt phòng</title>
        <meta name="description" content="Quản lý đặt phòng" />
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
        <h1 className="ml-1 text-base uppercase text-gray-600 font-semibold hidden md:block">Quản lý đặt phòng</h1>
        <span className="text-sm text-[#6c757d]"> / </span>
        <span className="text-sm text-[#3a86ff]">Chi tiết đặt phòng</span>
      </div>

      {!getBookingDetailQuery.isFetching && (
        <form className="mt-2 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Thông tin chi tiết</h2>

          <div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Mã đặt phòng:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={bookingDetailData.id}
                  readOnly
                />
              </div>
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Mã phòng:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={bookingDetailData.room_id}
                  readOnly
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Loại phòng:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={bookingDetailData.type}
                  readOnly
                />
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold mb-4 block">Thông tin người đặt phòng:</span>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                <div className="mb-4 w-full md:w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">Họ tên:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                    defaultValue={bookingDetailData.fullname_order}
                    readOnly
                  />
                </div>

                <div className="mb-4 w-full md:w-[300px]">
                  <label className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                    defaultValue={bookingDetailData.email_order}
                    readOnly
                  />
                </div>

                <div className="mb-4 w-full md:w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">Phone:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                    defaultValue={bookingDetailData.phone_order}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold mb-4 block">Thông tin khách hàng:</span>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                <div className="mb-4 w-full md:w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">Họ tên:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                    defaultValue={bookingDetailData.fullname_customer}
                    readOnly
                  />
                </div>

                <div className="mb-4 w-full md:w-[300px]">
                  <label className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                    defaultValue={bookingDetailData.email_customer}
                    readOnly
                  />
                </div>

                <div className="mb-4 w-full md:w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">Phone:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                    defaultValue={bookingDetailData.phone_customer}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Check-in:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={bookingDetailData.checkin}
                  readOnly
                />
              </div>

              <div className="mb-4 w-full md:w-[300px]">
                <label className="block text-sm font-medium text-gray-700">Check-out:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={bookingDetailData.checkout}
                  readOnly
                />
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold mb-4 block">Số lượng khách hàng:</span>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                <div className="mb-4 w-full md:w-[100px]">
                  <label className="block text-sm font-medium text-gray-700">Người lớn:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                    defaultValue={bookingDetailData.adults as number}
                    readOnly
                  />
                </div>

                <div className="mb-4 w-full md:w-[100px]">
                  <label className="block text-sm font-medium text-gray-700">Trẻ em:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                    defaultValue={bookingDetailData.children as number}
                    readOnly
                  />
                </div>

                <div className="mb-4 w-full md:w-[100px]">
                  <label className="block text-sm font-medium text-gray-700">Trẻ sơ sinh:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                    defaultValue={bookingDetailData.babies as number}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Ghi chú:</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                defaultValue={bookingDetailData.note}
                readOnly
              />
            </div>

            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Phạm vi đặt phòng:</label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                defaultValue={bookingDetailData.range}
                disabled
              >
                <option value="">Chọn</option>
                <option value="Nights">Nights</option>
                <option value="Months">Months</option>
              </select>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
