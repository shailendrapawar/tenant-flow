import type { IEditUserSchema } from "../schemas/editUserSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UserService } from "../user.service"
import { notify } from "@/components/shad/AppToaster"

const useEditProfile = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, error } = useMutation<
    object,
    Error,
    {
      id: string
      payload: IEditUserSchema
    }
  >({
    mutationKey: ["profile-update"],
    mutationFn: ({ id, payload }) => UserService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-me"] })
      notify.success("User Updated")
    },
    onError: (err) => {
      notify.error(`Failed to update user ${err}`)
    },
  })

  const editUser = async (id: string, payload: IEditUserSchema) => {
    mutate({ id, payload })
  }

  return { editUser, isPending, isError, error }
}

export default useEditProfile
