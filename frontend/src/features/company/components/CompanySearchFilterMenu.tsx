import { Input } from "@/components/ui/input"
import React, { useState } from "react"

import { IoFilter } from "react-icons/io5"

import { AppModal } from "@/components/AppModal"
import CompanySearchFilterItems from "./CompanySearchFilterItems"
import AppSelectMenu from "@/components/shad/AppSelectMenu"

import { RxCross2 } from "react-icons/rx";

const CompanySearchFilterMenu = () => {
  const [status, setStatus] = useState("")
  const [toggleFilter, setToggleFilter] = useState(false)
  return (
    <div className="relative flex h-10 w-full gap-5">
      <Input
        className="h-full w-[80%] max-w-60 bg-card"
        placeholder="Search by name"
      />
      <IoFilter
        className="absolute right-0 h-10 w-10 cursor-pointer rounded-full border bg-primary p-2 text-primary-foreground transition active:scale-95 sm:hidden"
        onClick={() => setToggleFilter(true)}
      />

      <section className="hidden h-full w-full sm:flex gap-2  items-center">
        <AppSelectMenu
          className="h-full w-22 bg-card text-xs"
          items={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Suspended", value: "suspended" },
            { label: "Banned", value: "banned" },
          ]}
          placeholder="Status"
          value={status}
          onValueChange={setStatus}
        />

        <RxCross2 className=" p-1.5 h-8 w-8 bg-primary active:scale-95 transition cursor-pointer text-primary-foreground rounded-full" />

      </section>

      {/* this is for mobile view */}
      <AppModal
        title="Select filters+"
        className=""
        open={toggleFilter}
        onClose={() => setToggleFilter(false)}
        children={<CompanySearchFilterItems />}
      />
    </div>
  )
}

export default CompanySearchFilterMenu
