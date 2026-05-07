import API from "@/lib/api/axios"
import type { LoginPaylodType } from "./schemas/loginSchema"

interface AuthService {
  login: () => Promise<object>
  register: () => Promise<object>
}

export const AuthService = {
  login: async (data: LoginPaylodType) => {
    const res = await API.post("/users/auth/login", data)
    return res
  },
  register: async () => {
    return {}
  },
}
