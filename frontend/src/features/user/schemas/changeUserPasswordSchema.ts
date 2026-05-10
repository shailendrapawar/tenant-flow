import z from "zod";

export const ChangeUserPasswordSchema = z.object({
    currentPassword: z.string().min(4, "Invalid password length"),
    newPassword: z.string().min(4, "Invalid password length")
})
export type IChangeUserPasswordSchema = z.infer<typeof ChangeUserPasswordSchema>