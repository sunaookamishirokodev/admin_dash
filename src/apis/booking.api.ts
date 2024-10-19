import { TypeBooking } from "src/types/branches.type"
import http from "src/utils/http"

export const bookingAPI = {
  getBookings: (signal?: AbortSignal) => {
    return http.get<{ data: TypeBooking[] }>("booking", { signal })
  },
  detailBooking: (id: string) => {
    return http.get<{ data: TypeBooking }>(`booking/${id}`)
  },
  updateBooking: ({ body }: { body: TypeBooking }) => {
    return http.put<{ data: TypeBooking }>(`booking`, body)
  },
  deleteBooking: (id: string) => {
    return http.delete<{ data: TypeBooking }>(`booking/${id}`)
  }
}
