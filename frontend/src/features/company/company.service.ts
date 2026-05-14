import API from "@/lib/api/axios"
import type { ISearchCompanyPayload } from "./company.types"

interface ICompanyService {
  get: (id: string) => object
  search: (query: ISearchCompanyPayload) => object
}

export const CompanyService: ICompanyService = {
  get: async (id: string) => {
    const res = await API.get(`/companies/${id}`)
    return res
  },

  search: async (payload: ISearchCompanyPayload) => {
    // 1: build query
    const query = new URLSearchParams()

    query.append("page", payload.page?.toString() || "1")
    query.append("limit", payload.limit?.toString() || "10")

    if (payload?.selectedfilters?.name) {
      query.append("name", payload.selectedfilters.name?.toLowerCase())
    }
    if (payload?.selectedfilters?.status) {
      query.append("status", payload.selectedfilters.status)
    }

    console.log(payload)
    const res = await API.get(`/companies`, {
      params: query,
    })
    return res
  },
}
