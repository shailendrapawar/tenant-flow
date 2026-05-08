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
    search: async (query: string) => {
        const res = await API.get(`/properties/${query}`)
        return res
    }
}