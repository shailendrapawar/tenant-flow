import z from "zod"

export const EditUserSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().optional(),
  //   email: z.string().email("Invalid email"),
  gender: z.string().optional(),
})

export type IEditUserSchema = z.infer<typeof EditUserSchema>
