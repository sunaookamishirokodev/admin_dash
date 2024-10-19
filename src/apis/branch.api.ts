import { TypeBranch } from "src/types/branches.type"
import http from "src/utils/http"

export const branchAPI = {
  getBranchs: (signal?: AbortSignal) => {
    return http.get<{ data: TypeBranch[] }>("branch/all", { signal })
  },
  createBranch: (body: TypeBranch) => {
    return http.postForm<{ data: TypeBranch }>("branch", body)
  },
  detailBranch: (id: string) => {
    return http.get<{ data: TypeBranch }>(`branch/${id}`)
  },
  updateBranch: ({ body }: { body: TypeBranch }) => {
    return http.putForm<{ data: TypeBranch }>(`branch`, body)
  },
  deleteBranch: (id: string) => {
    return http.delete<{ data: TypeBranch }>(`branch/${id}`)
  }
}
