import API from "@/lib/api/axios"
import type { IEditUserSchema } from "./schemas/editUserSchema"

interface UserService {
  update: (id: string, payload: IEditUserSchema) => Promise<object>
}

export const UserService: UserService = {
  update: async (id: string, payload: IEditUserSchema) => {
    const res = await API.put(`/users/${id}`, payload)
    return res
  },
}
