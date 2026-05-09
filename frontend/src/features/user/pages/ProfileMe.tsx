import { Button } from "@/components/ui/button"
import useAuthUser from "../hooks/useAuthUser"
import ProfileCard from "../components/ProfileCard"
import UserInfoCard from "../components/UserInfoCard"

const ProfileMe = () => {
  const { authUser } = useAuthUser()

  const user = authUser.user
  console.log(user)

  return (
    <main className="flex h-auto min-h-screen w-screen flex-col items-center p-5">
      <ProfileCard user={user!} />

      <hr className="mt-5 h-0.5 w-full max-w-120 rounded-full border-none bg-muted" />

      <section className="flex h-auto w-full flex-col items-center gap-4 py-4">
        <h2 className="text-center text-lg text-foreground">
          Personal Information
        </h2>

        <UserInfoCard user={user!} />
      </section>
    </main>
  )
}

export default ProfileMe
