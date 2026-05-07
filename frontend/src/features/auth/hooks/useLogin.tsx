import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../auth.service"
import type { LoginPaylodType } from "../schemas/loginSchema"

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginPaylodType) => AuthService.login(data),
  })
}
