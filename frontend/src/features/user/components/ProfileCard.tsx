import { Button } from "@/components/ui/button"
import { RiLogoutCircleRLine } from "react-icons/ri"

import type { AuthUser } from "../user.types"

const ProfileCard = ({ user }: { user: AuthUser }) => {
  return (
    <section className="relative flex w-full max-w-120 flex-col items-center gap-8 rounded-lg border bg-card py-10">
      <img
        className="h-30 w-30 rounded-full bg-secondary p-1"
        src={user?.avatar?.url || ""}
        alt=""
      />

      <div className="flex gap-4">
        <Button className="bg-primary py-5">Remove Photo</Button>
        <Button className="bg-primary py-5">Change Photo</Button>
      </div>

      <RiLogoutCircleRLine
        title="logout"
        className="absolute top-4 right-4 size-6 cursor-pointer"
      />
    </section>
  )
}

export default ProfileCard
