import { Button } from "@/components/ui/button"
import React from "react"
import type { AuthUser } from "../user.types"

const ProfileCard = ({ user }: { user: AuthUser }) => {
  return (
    <section className="flex w-full max-w-120 flex-col items-center gap-8 rounded-lg border bg-card py-10">
      <img
        className="h-30 w-30 rounded-full bg-secondary p-1"
        src={user?.avatar?.url || ""}
        alt=""
      />
      <div className="flex gap-4">
        <Button className="">Remove Photo</Button>
        <Button>Change Photo</Button>
      </div>
    </section>
  )
}

export default ProfileCard
