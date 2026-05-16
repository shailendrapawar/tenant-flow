import { AppModal } from "@/components/shad/AppModal"
import type { AuthUser } from "../user.types"
import { useState } from "react"
import EditUserInfoCard from "./EditUserInfoCard"
import { Button } from "@/components/ui/button"

import { DataField } from "@/components/DataFIeld"

const UserInfoCard = ({ user }: { user: AuthUser }) => {
  const [toggleModal, setToggleModal] = useState(false)
  const DataFieldItems = [
    {
      title: "First Name",
      value: user?.firstName,
    },
    {
      title: "Last Name",
      value: user?.lastName,
    },
    {
      title: "Email",
      value: user?.email,
    },
    {
      title: "Gender",
      value: user?.gender,
    },
    {
      title: "Role",
      value: user?.role?.toUpperCase(),
    },
  ]
  return (
    <main className="relative flex h-auto w-full max-w-200 flex-col rounded-lg border bg-card px-5 py-5">
      <AppModal
        title="Edit your info"
        open={toggleModal}
        onClose={() => {
          setToggleModal(false)
        }}
        className="inherit"
        children={<EditUserInfoCard user={user} />}
      />

      <section className="grid h-auto w-full grid-cols-1 gap-4 py-5 sm:grid-cols-2">
        {DataFieldItems.map((item, index) => (
          <DataField
            className=""
            key={index}
            title={item.title}
            titleClassName="text-muted-foreground"
            value={item.value}
            valueClassName="text-foreground text-xs sm:text-md"
          />
        ))}
      </section>
      <Button
        className="w-20 self-end border-3 border-primary bg-card text-primary hover:bg-primary hover:text-primary-foreground"
        onClick={() => setToggleModal(true)}
      >
        Edit
      </Button>
    </main>
  )
}

export default UserInfoCard
