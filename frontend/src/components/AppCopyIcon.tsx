import React, { useState } from "react"
import { IoCopy } from "react-icons/io5"
import { LuCopyCheck } from "react-icons/lu"
const AppCopyIcon = ({ value }: { value: string }) => {
  const [interval, setInterval] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setInterval(true)
    setTimeout(() => {
      setInterval(false)
    }, 1000)
  }

  return (
    <>
      {interval == false ? (
        <IoCopy
          size={15}
          onClick={handleCopy}
          className="text-secondary-foreground active:scale-90 active:opacity-55"
          title="copy ID"
        />
      ) : (
        <LuCopyCheck
          size={15}
          className="text-success active:scale-90 active:opacity-55"
          title="copied"
        />
      )}
    </>
  )
}

export default AppCopyIcon
