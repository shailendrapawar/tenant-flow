import useAuthUser from "@/features/user/hooks/useAuthUser"

const useRoles = () => {
  const { data, isLoading } = useAuthUser()
  const user = data

  const getRole = user?.role
  const isAdmin = user?.role == "admin"
  const isLandlord = user?.role == "landlord"

  return { getRole, isAdmin, isLandlord }
}

export default useRoles
