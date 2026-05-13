import { Input } from "@/components/ui/input"
import React, { useState } from "react"

import { IoFilter } from "react-icons/io5"

import { AppModal } from "@/components/AppModal"
import CompanySearchFilterItems from "./CompanySearchFilterItems"
import AppSelectMenu from "@/components/shad/AppSelectMenu"

const CompanySearchFilterMenu = () => {
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

      <section className="hidden h-full w-full sm:flex">
        {/* <AppSelectMenu
          className="h-full w-25 bg-card"
          items={[
            // { label: "", value: "" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Suspended", value: "suspended" },
            { label: "Banned", value: "banned" },
          ]}
          placeholder="Status"
        /> */}
      </section>

      {/* this is for mobile view */}
      <AppModal
        className=""
        open={toggleFilter}
        onClose={() => setToggleFilter(false)}
        children={<CompanySearchFilterItems />}
      />
    </div>
  )
}

export default CompanySearchFilterMenu
