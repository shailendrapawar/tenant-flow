import useAuthUser from "../hooks/useAuthUser"
import ProfileCard from "../components/ProfileCard"
import UserInfoCard from "../components/UserInfoCard"

import { motion } from "framer-motion"
import SecurityInfoCard from "../components/SecurityInfoCard"

const ProfileMe = () => {
  const { authUser } = useAuthUser()

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex min-h-screen w-screen flex-col items-center p-5"
    >
      {/* Profile */}
      <div className="flex w-full justify-center">
        <ProfileCard user={authUser.user!} />
      </div>

      {/* Divider */}
      <hr className="mt-5 h-0.5 w-full max-w-120 rounded-full border-none bg-muted" />

      {/* Info */}
      <section className="flex w-full flex-col items-center gap-4 py-6">
        <h2 className="text-center text-lg font-medium text-foreground">
          Personal Information
        </h2>

        <div className="flex w-full justify-center">
          <UserInfoCard user={authUser.user!} />
        </div>
      </section>

      {/* Divider */}
      <hr className="mt-5 h-0.5 w-full max-w-120 rounded-full border-none bg-muted" />
      <section className="flex w-full flex-col items-center gap-4 py-6">
        <h2 className="text-center text-lg font-medium text-foreground">
          Privacy & Security
        </h2>
        <SecurityInfoCard user={authUser.user!} />
      </section>

    </motion.main>
  )
}

export default ProfileMe
