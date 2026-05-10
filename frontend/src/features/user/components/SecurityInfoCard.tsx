import { Button } from "@/components/ui/button"
import type { AuthUser } from "../user.types"
import { useState } from "react"
import { AppModal } from "@/components/AppModal";
import ChangePasswordCard from "./ChangePasswordCard";

const SecurityInfoCard = ({ user }: { user: AuthUser }) => {
    const [modalToggle, setModalToggle] = useState(false);
    return (
        <main className="w-full flex flex-col h-auto p-5 bg-card rounded-lg max-w-200 gap-4 text-sm">
            <AppModal
                open={modalToggle}
                onClose={() => setModalToggle(false)}
                title="Change Password"
                children={<ChangePasswordCard />}
            />

            <section className="flex justify-between items-center">
                <span className="text-secondary">Change password for you account</span>
                <Button className="text-xs sm:text-md hover:bg-danger hover:text-primary-foreground bg-card text-danger border-2 border-danger"
                    onClick={() => setModalToggle(true)}
                >Change password</Button>
            </section>
            <section className="flex justify-between items-center">
                <span className="text-secondary ">Last login at: </span>
                <span className="text-xs sm:text-md">{user.lastLoginAt}</span>
            </section>


        </main>
    )
}
export default SecurityInfoCard