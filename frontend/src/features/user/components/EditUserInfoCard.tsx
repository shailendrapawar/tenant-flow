import React from "react"
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

const EditUserInfoCard = ({ user }: { user: AuthUser }) => {
  const form = useForm<IEditUserSchema>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
    },
  })
  return (
    <form className="h-auto w-full">
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

      <Button type="submit" className="mt-8 h-10 w-full">
        Save
      </Button>
    </form>
  )
}

export default EditUserInfoCard
