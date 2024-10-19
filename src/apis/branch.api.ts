import { TypeBranch } from "src/types/branches.type"
import http from "src/utils/http"

export const branchAPI = {
  getBranchs: (signal?: AbortSignal) => {
    return http.get<TypeBranch[]>("branches", { signal })
  },
  createBranch: (body: TypeBranch) => {
    return http.post<TypeBranch>("branches", body)
  },
  detailBranch: (id: string) => {
    return http.get<TypeBranch>(`branches/${id}`)
  },
  updateBranch: ({ id, body }: { id: string; body: TypeBranch }) => {
    return http.put<TypeBranch>(`branches/${id}`, body)
  }
}
