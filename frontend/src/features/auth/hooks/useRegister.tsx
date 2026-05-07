import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../auth.service"
import type { RegisterPayloadType } from "../schemas/registerSchema"

const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterPayloadType) => AuthService.register(data),
  })
}

export default useRegister
