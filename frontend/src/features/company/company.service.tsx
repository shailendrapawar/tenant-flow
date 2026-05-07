import API from "@/lib/api/axios"

interface CompanyService {
  get: (id: string) => object
  search: (query: string) => object
}

export const CompanyService: CompanyService = {
  get: async (id: string) => {
    const res = await API.get(`/companies/${id}`)
    return res
  },

  search: async (query: string) => {
    const res = await API.get("/companies")
    return res
  },
}
