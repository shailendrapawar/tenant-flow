import { AppModal } from "@/components/AppModal"
import type { AuthUser } from "../user.types"
import { useState } from "react"
import EditUserInfoCard from "./EditUserInfoCard"
import { Button } from "@/components/ui/button"

import { DataField } from "@/components/DataFIeld"

const UserInfoCard = ({ user }: { user: AuthUser }) => {
  const [toggleModal, setToggleModal] = useState(false)
  return (
    <main className="relative flex h-auto w-full max-w-200 flex-col rounded-lg border bg-card px-5 py-5">
      <AppModal
        title="Edit personal"
        open={toggleModal}
        onClose={() => {
          setToggleModal(false)
        }}
        children={<EditUserInfoCard user={user} />}
      />

      <section className="grid h-auto w-full grid-cols-1 gap-4 py-5 sm:grid-cols-2">
        <DataField
          title="First Name"
          titleClassName="text-muted-foreground"
          value={user.firstName}
          valueClassName="text-foreground"
        />
        <DataField
          title="Last Name"
          titleClassName="text-muted-foreground"
          value={user.lastName}
          valueClassName="text-foreground"
        />
        <DataField
          title="Email"
          titleClassName="text-muted-foreground"
          value={user.email}
          valueClassName="text-foreground"
        />
        <DataField
          title="Gender"
          titleClassName="text-muted-foreground"
          value={user.gender}
          valueClassName="text-foreground"
        />
        <DataField
          title="Role"
          titleClassName="text-muted-foreground"
          value={user.role}
          valueClassName="text-foreground"
        />
      </section>
      <Button className="w-20 self-end" onClick={() => setToggleModal(true)}>
        Edit
      </Button>
    </main>
  )
}

export default UserInfoCard
