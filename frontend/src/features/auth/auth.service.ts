import API from "@/lib/api/axios"
import type { LoginPaylodType } from "./schemas/loginSchema"
import type { RegisterPayloadType } from "./schemas/registerSchema"

interface AuthService {
  login: () => Promise<object>
  register: () => Promise<object>
}

export const AuthService = {
  login: async (data: LoginPaylodType) => {
    const res = await API.post("/users/auth/login", data)
    return res
  },
  register: async (data: RegisterPayloadType) => {
    const res = await API.post("/users/auth/register", data)
    return res
  },
}
