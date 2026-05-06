import * as z from "zod"
export const loginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(4, "Invalid password length"),
})
