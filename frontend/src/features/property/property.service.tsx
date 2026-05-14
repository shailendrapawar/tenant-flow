import API from "@/lib/api/axios"

interface IPropertyService {
  get: (id: string) => object
  search: (query: string) => object
}

export const PropertyService: IPropertyService = {
  get: async (id: string) => {
    const res = await API.get(`/properties/${id}`)
    return res
  },
  search: async (payload: string) => {
    const query = new URLSearchParams()
    const res = await API.get(`/properties`, {
      params: query,
    })

    return res
  },
}
