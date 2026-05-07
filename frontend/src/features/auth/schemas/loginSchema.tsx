import * as z from "zod"
export const LoginPaylodSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(4, "Invalid password length"),
})
export type LoginPaylodType = z.infer<typeof LoginPaylodSchema>
