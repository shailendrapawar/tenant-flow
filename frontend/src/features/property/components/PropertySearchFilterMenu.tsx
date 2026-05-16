import { Input } from "@/components/ui/input"
import React, { useState, type ChangeEvent } from "react"
import { useSearchPropertyFilterStore } from "../store/property.store"
import { IoFilter } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { RxCross2 } from "react-icons/rx"
import { AppModal } from "@/components/shad/AppModal"
import PropertySeachFilterItems from "./PropertySeachFilterItems"
import AppSelectMenu from "@/components/shad/AppSelectMenu"

const PropertySearchFilterMenu = () => {
  const [toggleFilter, setToggleFilter] = useState(false)
  const [searchBy, setSearchBy] = useState("name")
  const {
    selectedfilters,
    setSelectedFilters,
    applyFilters,
    clearAllFilters,
    getAppliedFiltersLength,
  } = useSearchPropertyFilterStore()
  console.log(selectedfilters)
  return (
    <div className="relative flex h-10 w-full gap-5">
      <AppSelectMenu
        placeholder="Search By"
        items={[
          { value: "company", label: "By companyId" },
          { value: "name", label: "By name" },
        ]}
        value={searchBy}
        onValueChange={(value) => {
          setSearchBy(value)
        }}
        className="h-10 w-30 border-2 border-primary text-xs"
      />

      <Input
        className="h-full w-[80%] max-w-60 bg-card text-sm"
        placeholder={
          searchBy == "company"
            ? "Enter company ID..."
            : "Enter Property Name..."
        }
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          console.log(searchBy, ":", e.target.value)
          let timer
          clearTimeout(timer)
          timer = setTimeout(() => {
            setSelectedFilters(searchBy, e.target.value)
          }, 1000)
        }}
      />

      <div className="relative">
        <IoFilter
          className={`h-10 w-10 cursor-pointer rounded-full border ${applyFilters ? "bg-primary text-primary-foreground" : "border-2 border-primary bg-muted text-primary"} p-2 transition active:scale-95`}
          onClick={() => setToggleFilter(true)}
        />
        {applyFilters && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-primary-foreground text-xs text-primary">
            {getAppliedFiltersLength()}
          </span>
        )}
      </div>

      {applyFilters && (
        <Button
          className="hidden h-10 text-xs sm:flex"
          onClick={() => clearAllFilters()}
        >
          {" "}
          <RxCross2 />
          Clear filters
        </Button>
      )}

      <AppModal
        title="Select filters"
        className=""
        open={toggleFilter}
        onClose={() => setToggleFilter(false)}
        children={<PropertySeachFilterItems />}
      />
    </div>
  )
}

export default PropertySearchFilterMenu
