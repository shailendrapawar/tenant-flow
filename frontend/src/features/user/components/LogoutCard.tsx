import { Button } from "@/components/ui/button"
import { useModal } from "@/contexts/ModalContext"
import useLogoutUser from "../hooks/useLogoutUser"
import { useNavigate } from "react-router-dom"
import { AUTH_ROUTES } from "@/features/auth/auth.routes"

const LogoutCard = () => {

    const { logout, isPending } = useLogoutUser()
    const { onClose } = useModal()


    const handleLogout = () => {
        logout()
    }
    return (
        <div className="py-5 flex justify-evenly ">
            {!isPending && (<Button className="h-10 w-20 bg-secondary active:scale-95 transition-all"
                onClick={() => onClose()}
            >Cancel</Button>)}
            <Button className="h-10 w-20 bg-danger  active:scale-95 transition-all"
                onClick={() => handleLogout()}
            >{isPending ? "Loggin-out..." : "Proceed"}</Button>
        </div>
    )
}
export default LogoutCard