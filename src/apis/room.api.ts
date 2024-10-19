import { TypeRoom } from "src/types/branches.type"
import http from "src/utils/http"

export const roomAPI = {
  getRooms: (signal?: AbortSignal) => {
    return http.get<{ data: TypeRoom[] }>("room/all", { signal })
  },
  createRoom: (body: TypeRoom) => {
    return http.postForm<{ data: TypeRoom }>("room", body)
  },
  detailRoom: (id: string) => {
    return http.get<{ data: TypeRoom }>(`room/${id}`)
  },
  updateRoom: ({ body }: { body: TypeRoom }) => {
    return http.putForm<{ data: TypeRoom }>(`room`, body)
  },
  deleteRoom: (id: string) => {
    return http.delete<{ data: TypeRoom }>(`room/${id}`)
  }
}
