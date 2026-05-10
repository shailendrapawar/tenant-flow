import { Controller, useForm } from "react-hook-form"
import { ChangeUserPasswordSchema, type IChangeUserPasswordSchema } from "../schemas/changeUserPasswordSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ChangePasswordCard = () => {

    const form = useForm<IChangeUserPasswordSchema>({
        resolver: zodResolver(ChangeUserPasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: ""
        }
    })

    const handleChangePassword = async (data: IChangeUserPasswordSchema) => {

        console.log(data)
    }
    return (
        <form
            className="mt-5 h-auto w-full flex flex-col gap-5 text-sm"
            onSubmit={form.handleSubmit(handleChangePassword)}
        >
            <FieldGroup>
                <Controller
                    name="currentPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                            <Input
                                className="h-10 text-sm"
                                id={field.name}
                                placeholder="enter current password"
                                type="text"
                                {...field}
                            />
                            {/* <FieldDescription>Provide your email</FieldDescription> */}
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="newPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                            <Input
                                className="h-10 text-sm"
                                id={field.name}
                                placeholder="enter new password"
                                type="text"
                                {...field}
                            />
                            {/* <FieldDescription>Provide your email</FieldDescription> */}
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

            </FieldGroup>

            <Button className="self-end">Submit</Button>

        </form>
    )
}
export default ChangePasswordCard