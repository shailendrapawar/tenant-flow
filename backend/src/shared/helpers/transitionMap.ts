import { AppError } from "../utils/error"

export const canTransition = (map: any, currentStatus: string, destinedStatus: string) => {

    if (map[currentStatus].includes(destinedStatus)) {
        return true
    }

    throw new AppError(`Cannot set ${currentStatus} to ${destinedStatus}`, 400)
}