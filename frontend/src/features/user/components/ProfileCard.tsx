import { Button } from "@/components/ui/button"
import { RiLogoutCircleRLine } from "react-icons/ri"

import type { AuthUser } from "../user.types"
import { useState } from "react"
import { AppModal } from "@/components/shad/AppModal"
import LogoutCard from "./LogoutCard"

const ProfileCard = ({ user }: { user: AuthUser }) => {
  const [toggleModal, setToggleModal] = useState(false)

  return (
    <section className="relative flex w-full max-w-120 flex-col items-center gap-8 rounded-lg border bg-card py-10">
      <img
        className="h-25 w-25 rounded-full bg-secondary p-1 sm:h-30 sm:w-30"
        src={user?.avatar?.url || ""}
        alt=""
      />

      <div className="flex gap-4">
        <Button className="border-2 border-secondary bg-card py-2 text-xs text-secondary-foreground hover:bg-secondary hover:text-primary-foreground">
          Remove Photo
        </Button>
        <Button className="bg-secondary py-2 text-xs">Change Photo</Button>
      </div>

      <AppModal
        open={toggleModal}
        title="Log out from this account ?"
        className=""
        onClose={() => setToggleModal(false)}
        children={<LogoutCard />}
      />

      <RiLogoutCircleRLine
        onClick={() => setToggleModal(true)}
        title="logout"
        className="absolute top-4 right-4 size-6 cursor-pointer transition-all active:scale-95"
      />
    </section>
  )
}

export default ProfileCard
