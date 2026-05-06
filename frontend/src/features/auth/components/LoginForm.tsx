import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { loginFormSchema } from "../schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLogin = (data: z.infer<typeof loginFormSchema>) => {
    console.log(data)
  }

  return (
    <div className="border-bg-foreground flex w-full max-w-120 flex-col gap-5 rounded-lg border bg-card px-5 py-10">
      <h1 className="text-center text-2xl font-bold">Tenant Flow</h1>
      <h3 className="text-center text-lg">Sing-In</h3>

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
      <p className="text-sm text-muted-foreground hover:text-primary text-center cursor-pointer"
        onClick={() => navigate("/auth/register")}
      >New user? Register here</p>
    </div>
  )
}

export default LoginForm
