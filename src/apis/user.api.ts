import { TypeUser } from "src/types/branches.type"
import http from "src/utils/http"

export const userAPI = {
  getUsers: (signal?: AbortSignal) => {
    return http.get<{ data: TypeUser[] }>("users ", { signal })
  },
  detailUser: (id: string) => {
    return http.get<{ data: TypeUser }>(`users/${id}`)
  },
  updateUser: ({ body }: { body: TypeUser }) => {
    return http.put<{ data: TypeUser }>(`users`, body)
  },
  deleteUser: (id: string) => {
    return http.delete<{ data: TypeUser }>(`users/${id}`)
  }
}
