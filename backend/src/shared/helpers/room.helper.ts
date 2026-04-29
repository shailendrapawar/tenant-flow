import { any } from "zod"

const extractUniqueRooms = (data: any) => {
    let uniqueRooms = new Map()

    data?.map((room: any) => {
        // uniqueRooms?.set(room?.roomNumber) = room
        uniqueRooms.set(room.roomNumber, room)
    })

    let result = Object.entries(uniqueRooms).map((v) => v)

    return result || []
}