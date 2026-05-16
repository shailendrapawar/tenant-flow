import { Button } from "@/components/ui/button"
import type { AuthUser } from "../user.types"
import { useState } from "react"
import { AppModal } from "@/components/shad/AppModal"
import ChangePasswordCard from "./ChangePasswordCard"

const SecurityInfoCard = ({ user }: { user: AuthUser }) => {
  const [modalToggle, setModalToggle] = useState(false)
  return (
    <main className="flex h-auto w-full max-w-200 flex-col gap-4 rounded-lg bg-card p-5 text-sm">
      <AppModal
        open={modalToggle}
        onClose={() => setModalToggle(false)}
        title="Change Password"
        children={<ChangePasswordCard />}
      />

      <section className="flex items-center justify-between">
        <span className="text-secondary">Change password for you account</span>
        <Button
          className="sm:text-md border-2 border-danger bg-card text-xs text-danger hover:bg-danger hover:text-primary-foreground"
          onClick={() => setModalToggle(true)}
        >
          Change password
        </Button>
      </section>
      <section className="flex items-center justify-between">
        <span className="text-secondary">Last login at: </span>
        <span className="sm:text-md text-xs">{user.lastLoginAt}</span>
      </section>
    </main>
  )
}
export default SecurityInfoCard
