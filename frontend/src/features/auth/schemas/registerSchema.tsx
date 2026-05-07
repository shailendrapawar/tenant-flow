import * as z from "zod"
export const RegisterPayloadSchema = z.object({
  firstName: z.string().min(3, "min 3 length"),
  lastName: z.string().min(3, "min 3 length"),
  email: z.email("Invalid email address"),
  password: z.string().min(4, "Invalid password length"),
})
export type RegisterPayloadType = z.infer<typeof RegisterPayloadSchema>
