import { TypeBooking } from "src/types/branches.type"
import http from "src/utils/http"

export const bookingAPI = {
  getBookings: (signal?: AbortSignal) => {
    return http.get<TypeBooking[]>("bookings", { signal })
  },
  detailBooking: (id: string) => {
    return http.get<TypeBooking>(`bookings/${id}`)
  },
  updateBooking: ({ id, body }: { id: string; body: TypeBooking }) => {
    return http.put<TypeBooking>(`bookings/${id}`, body)
  },
  deleteBooking: (id: string) => {
    return http.delete<TypeBooking>(`bookings/${id}`)
  }
}
