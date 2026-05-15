import API from "@/lib/api/axios"
import type { ISearchPropertyPayload } from "./property.types"

interface IPropertyService {
  get: (id: string) => object
  search: (query: ISearchPropertyPayload) => object
}

export const PropertyService: IPropertyService = {
  get: async (id: string) => {
    const res = await API.get(`/properties/${id}`)
    return res
  },
  search: async (payload: ISearchPropertyPayload) => {
    const query = new URLSearchParams()

    query.append("page", payload.page?.toString() || "1")
    query.append("limit", payload.limit?.toString() || "10")

    //business level filters
    if (payload?.selectedfilters?.name) {
      query.append("name", payload.selectedfilters.name?.toLowerCase())
    }
    if (payload?.selectedfilters?.company) {
      query.append("companyID", payload.selectedfilters.company)
    }

    if (payload?.selectedfilters?.status) {
      query.append("status", payload.selectedfilters.status)
    }
    if (payload?.selectedfilters?.type) {
      query.append("type", payload.selectedfilters.type)
    }
    const res = await API.get(`/properties`, {
      params: query,
    })

    return res
  },
}
