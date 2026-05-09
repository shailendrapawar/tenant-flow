import type { AuthUser } from "../user.types"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditUserSchema, type IEditUserSchema } from "../schemas/editUserSchema"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import AppSelectMenu from "@/components/shad/AppSelectMenu"
import { GenderOptions } from "../user.constants"
import { Button } from "@/components/ui/button"
import useEditProfile from "../hooks/useEditProfile"
import { useModal } from "@/contexts/ModalContext"

const EditUserInfoCard = ({ user }: { user: AuthUser }) => {
  const { editUser, isPending } = useEditProfile()
  const { onClose } = useModal()

  const form = useForm<IEditUserSchema>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
    },
  })

  const handleEditUser = async (data: IEditUserSchema) => {
    if (isPending) {
      return
    }

    editUser(user._id, data)
    onClose()
  }

  return (
    <form
      className="mt-5 h-auto w-full"
      onSubmit={form.handleSubmit(handleEditUser)}
    >
      <FieldGroup>
        <Controller
          name="firstName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
              <Input
                className="h-10 text-sm"
                id={field.name}
                placeholder="enter first name"
                type="text"
                {...field}
              />
              {/* <FieldDescription>Provide your email</FieldDescription> */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="lastName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
              <Input
                className="h-10 text-sm"
                id={field.name}
                placeholder="enter last name"
                type="text"
                {...field}
              />
              {/* <FieldDescription>Provide your email</FieldDescription> */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="gender"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
              <AppSelectMenu
                className="h-10"
                items={GenderOptions}
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" className="mt-8 h-10 w-full" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  )
}

export default EditUserInfoCard
