import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useNavigate } from "react-router-dom"
import { AUTH_ROUTES } from "../auth.routes"
import {
  RegisterPayloadSchema,
  type RegisterPayloadType,
} from "../schemas/registerSchema"
import useRegister from "../hooks/useRegister"
import { notify } from "@/components/AppToaster"

const RegisterForm = () => {
  const navigate = useNavigate()
  const register = useRegister()

  const form = useForm<RegisterPayloadType>({
    resolver: zodResolver(RegisterPayloadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const handleRegister = (data: RegisterPayloadType) => {
    if (register.isPending) {
      return
    }
    //only go if not pending
    register.mutate(data, {
      onSuccess: (res: any) => {
        notify.success(res?.message)

        //navigate only when success
        setTimeout(() => {
          navigate(AUTH_ROUTES.LOGIN)
        }, 2000)
      },
      onError: (res: any) => {
        notify.error(res?.message)
      },
    })
  }
  return (
    <div className="border-bg-foreground flex w-full max-w-120 flex-col gap-5 rounded-lg border bg-card px-5 py-10">
      <h1 className="text-center text-2xl font-bold">Tenant Flow</h1>
      <h3 className="text-center text-lg">Sign-up</h3>

      <form
        className="mt-5 flex h-auto w-full flex-col gap-8"
        onSubmit={form.handleSubmit(handleRegister)}
      >
        <FieldGroup>
          <div className="flex gap-5">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                  <Input
                    className="h-10"
                    id={field.name}
                    placeholder="Enter email"
                    type="text"
                    {...field}
                  />
                  {/* <FieldDescription>Provide your email</FieldDescription> */}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    className="h-10"
                    id={field.name}
                    placeholder="Last Name"
                    type="text"
                    {...field}
                  />
                  {/* <FieldDescription>Provide your email</FieldDescription> */}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  className="h-10"
                  id={field.name}
                  placeholder="Enter email"
                  type="email"
                  {...field}
                />
                {/* <FieldDescription>Provide your email</FieldDescription> */}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  className="h-10"
                  id={field.name}
                  placeholder="Enter password"
                  type="password"
                  {...field}
                />
                {/* <FieldDescription>Provide your password</FieldDescription> */}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button type="submit" className="h-10 hover:bg-primary/90">
          Register
        </Button>
      </form>

      <p
        className="cursor-pointer text-center text-sm text-muted-foreground hover:text-primary"
        onClick={() => navigate(AUTH_ROUTES.LOGIN)}
      >
        Already a user? Login instead
      </p>
    </div>
  )
}
export default RegisterForm
