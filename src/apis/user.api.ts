import { TypeUser } from "src/types/branches.type"
import http from "src/utils/http"

export const userAPI = {
  getUsers: (signal?: AbortSignal) => {
    return http.get<TypeUser[]>("users", { signal })
  },
  detailUser: (id: string) => {
    return http.get<TypeUser>(`users/${id}`)
  },
  updateUser: ({ id, body }: { id: string; body: TypeUser }) => {
    return http.put<TypeUser>(`users/${id}`, body)
  },
  deleteUser: (id: string) => {
    return http.delete<TypeUser>(`users/${id}`)
  }
}
