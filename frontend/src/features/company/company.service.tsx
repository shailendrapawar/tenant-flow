import API from "@/lib/api/axios"

interface ICompanyService {
  get: (id: string) => object
  search: (query: string) => object
}

export const CompanyService: ICompanyService = {
  get: async (id: string) => {
    const res = await API.get(`/companies/${id}`)
    return res
  },

  search: async (query: string) => {
    const res = await API.get(`/companies${query}`)
    return res
  },
}
