import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { bookingAPI } from "src/apis/booking.api"
import { path } from "src/constants/path"
import { TypeBooking } from "src/types/branches.type"

type FormData = TypeBooking

export default function UpdateBooking() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { state } = useLocation()

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

  const updateUserMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: TypeBooking }) => {
      return bookingAPI.updateBooking({ id, body }) // Gọi hàm updateBranch với đối tượng chứa id và body
    }
  })

  const { handleSubmit, register, reset } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    const body = {
      adults: data.adults,
      children: data.children,
      babies: data.babies,
      checkin: data.checkin,
      checkout: data.checkout,
      fullname_order: data.fullname_order,
      email_order: data.email_order,
      phone_order: data.phone_order,
      fullname_customer: data.fullname_customer,
      email_customer: data.email_customer,
      phone_customer: data.phone_customer,
      type: data.type,
      range: data.range,
      room_id: data.room_id,
      note: data.note
    }

    updateUserMutation.mutate(
      { id: nameId as string, body },
      {
        onSuccess: () => {
          toast.success("Cập nhật booking thành công")
          navigate(path.listBooking)
          queryClient.invalidateQueries({ queryKey: ["bookingList", state] })
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
      adults: null,
      children: null,
      babies: null,
      checkin: "",
      checkout: "",
      fullname_order: "",
      email_order: "",
      phone_order: "",
      fullname_customer: "",
      email_customer: "",
      phone_customer: "",
      type: "",
      range: "",
      room_id: "",
      note: ""
    })
  }

  return (
    <div className="py-4 px-6 relative">
      <Helmet>
        <title>Cập nhật đặt phòng</title>
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
        <span className="text-sm text-[#3a86ff]">Cập nhật thông tin đặt phòng</span>
      </div>

      {!getBookingDetailQuery.isFetching && (
        <form onSubmit={onSubmit} className="mt-2 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Cập nhật thông tin</h2>

          <div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Mã đặt phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  {...register("id")}
                  defaultValue={bookingDetailData.id}
                  readOnly
                />
              </div>
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Mã phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={bookingDetailData.room_id}
                  {...register("room_id")}
                />
              </div>

              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Loại phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={bookingDetailData.type}
                  {...register("type")}
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
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                    defaultValue={bookingDetailData.fullname_order}
                    {...register("fullname_order")}
                  />
                </div>

                <div className="mb-4 w-full md:w-[300px]">
                  <label className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                    defaultValue={bookingDetailData.email_order}
                    {...register("email_order")}
                  />
                </div>

                <div className="mb-4 w-full md:w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">Phone:</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                    defaultValue={bookingDetailData.phone_order}
                    {...register("phone_order")}
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
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                    defaultValue={bookingDetailData.fullname_customer}
                    {...register("fullname_customer")}
                  />
                </div>

                <div className="mb-4 w-full md:w-[300px]">
                  <label className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                    defaultValue={bookingDetailData.email_customer}
                    {...register("email_customer")}
                  />
                </div>

                <div className="mb-4 w-full md:w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">Phone:</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                    defaultValue={bookingDetailData.phone_customer}
                    {...register("phone_customer")}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <div className="mb-4 w-full md:w-[200px]">
                <label className="block text-sm font-medium text-gray-700">Check-in:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={bookingDetailData.checkin}
                  {...register("checkin")}
                />
              </div>

              <div className="mb-4 w-full md:w-[300px]">
                <label className="block text-sm font-medium text-gray-700">Check-out:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={bookingDetailData.checkout}
                  {...register("checkout")}
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
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                    defaultValue={bookingDetailData.adults as number}
                    {...register("adults")}
                  />
                </div>

                <div className="mb-4 w-full md:w-[100px]">
                  <label className="block text-sm font-medium text-gray-700">Trẻ em:</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                    defaultValue={bookingDetailData.children as number}
                    {...register("children")}
                  />
                </div>

                <div className="mb-4 w-full md:w-[100px]">
                  <label className="block text-sm font-medium text-gray-700">Trẻ sơ sinh:</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                    defaultValue={bookingDetailData.babies as number}
                    {...register("babies")}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Ghi chú:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                defaultValue={bookingDetailData.note}
                {...register("note")}
              />
            </div>

            <div className="mb-4 w-full md:w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Phạm vi đặt phòng:</label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                defaultValue={bookingDetailData.range}
                {...register("range")}
              >
                <option value="">Chọn</option>
                <option value="Nights">Nights</option>
                <option value="Months">Months</option>
              </select>
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
