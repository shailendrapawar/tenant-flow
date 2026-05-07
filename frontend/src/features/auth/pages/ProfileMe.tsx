import React from "react"
import useAuthUser from "../hooks/useAuthUser"

const ProfileMe = () => {
  const { data, isError, isPending } = useAuthUser()
  console.log(data)
  return <div>ProfileMe</div>
}

export default ProfileMe
