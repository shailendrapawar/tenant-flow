import { Input } from "@/components/ui/input"
import { useState, type ChangeEvent } from "react"

import { IoFilter } from "react-icons/io5"

import { AppModal } from "@/components/AppModal"
import CompanySearchFilterItems from "./CompanySearchFilterItems"
import { useSearchCompanyFiltersStore } from "../store/company.store"
import { RxCross2 } from "react-icons/rx"
import { Button } from "@/components/ui/button"

const CompanySearchFilterMenu = () => {
  const [toggleFilter, setToggleFilter] = useState(false)
  const {
    setSelectedFilters,
    applyFilters,
    clearAllFilters,
    getAppliedFiltersLength,
  } = useSearchCompanyFiltersStore()

  return (
    <div className="relative flex h-10 w-full gap-5">
      <Input
        className="h-full w-[80%] max-w-60 bg-card"
        placeholder="Search by name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          let timer
          clearTimeout(timer)
          timer = setTimeout(() => {
            setSelectedFilters("name", e.target.value)
          }, 2000)
        }}
      />
      {/* <IoFilter
        className={`h-10 w-10 cursor-pointer rounded-full border ${applyFilters ? "bg-primary text-primary-foreground" : "border-2 border-primary bg-muted text-primary"} p-2 transition active:scale-95`}
        onClick={() => setToggleFilter(true)}
      /> */}
      <div className="relative">
        <IoFilter
          className={`h-10 w-10 cursor-pointer rounded-full border ${applyFilters ? "bg-primary text-primary-foreground" : "border-2 border-primary bg-muted text-primary"} p-2 transition active:scale-95`}
          onClick={() => setToggleFilter(true)}
        />
        {applyFilters && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-xs text-primary">
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
        children={<CompanySearchFilterItems />}
      />
    </div>
  )
}

export default CompanySearchFilterMenu
