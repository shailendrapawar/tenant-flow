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

  search: async (params: any) => {
    // 1: build query
    const query = new URLSearchParams()

    query.append("page", params?.page || 1)
    query.append("limit", params?.limit || 10)

    const res = await API.get(`/companies`, {
      params: params,
    })
    return res
  },
}
