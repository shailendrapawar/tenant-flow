import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"

import { LoginPaylodSchema, type LoginPaylodType } from "../schemas/loginSchema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { AUTH_ROUTES } from "../auth.routes"
import { useLogin } from "../hooks/useLogin"
import { notify } from "@/components/AppToaster"

const LoginForm = () => {
  const navigate = useNavigate()
  const login = useLogin()

  //form
  const form = useForm<LoginPaylodType>({
    resolver: zodResolver(LoginPaylodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLogin = (data: LoginPaylodType) => {
    // e.preventDefault()
    if (login.isPending) {
      return
    }
    //only go if not pending
    login.mutate(data, {
      onSuccess: (res: any) => {
        notify.success(res?.message)
        //navigate only when success
        setTimeout(() => {
          navigate(AUTH_ROUTES.ME)
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
      <h3 className="text-center text-lg">Sign-In</h3>

      <form
        className="mt-5 flex h-auto w-full flex-col gap-8"
        onSubmit={form.handleSubmit(handleLogin)}
      >
        <FieldGroup>
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
          Login
        </Button>
      </form>
      <p
        className="cursor-pointer text-center text-sm text-muted-foreground hover:text-primary"
        onClick={() => navigate(AUTH_ROUTES.REGISTER)}
      >
        New user? Register here
      </p>
    </div>
  )
}

export default LoginForm
