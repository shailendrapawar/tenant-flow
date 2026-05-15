import React from "react"
import { useSearchPropertyFilterStore } from "../store/property.store"
import { useModal } from "@/contexts/ModalContext"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PROPERTY_STATUSES, PROPERTY_TYPES } from "../property.constants"

const PropertySeachFilterItems = () => {
  const {
    setSelectedFilters,
    clearAllFilters,
    selectedfilters,
    setApplyFilters,
    getAppliedFiltersLength,
  } = useSearchPropertyFilterStore()

  const { onClose } = useModal()

  return (
    <main className="flex h-auto w-full flex-col gap-8 py-2">
      {/* status filter */}
      <section className="flex h-auto flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2>Status:</h2>
          <span
            className="cursor-pointer text-xs text-primary"
            title="clear status filters"
            onClick={() => setSelectedFilters("status", "")}
          >
            clear
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pl-5">
          {PROPERTY_STATUSES.map((status) => (
            <Badge
              key={status.value}
              variant={
                selectedfilters?.status == status.value
                  ? "selectedFilter"
                  : "unSelectedFilter"
              }
              className="px-4 py-4"
              onClick={() => setSelectedFilters("status", status.value)}
            >
              {status.label}
            </Badge>
          ))}
        </div>
      </section>

      <hr className="m-0" />
      {/* property type filter */}
      <section className="flex h-auto flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2>Property Type:</h2>
          <span
            className="cursor-pointer text-xs text-primary"
            title="clear property type filters"
            onClick={() => setSelectedFilters("type", "")}
          >
            clear
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pl-5">
          {PROPERTY_TYPES.map((type) => (
            <Badge
              key={type.value}
              variant={
                selectedfilters?.type == type.value
                  ? "selectedFilter"
                  : "unSelectedFilter"
              }
              className="px-4 py-4"
              onClick={() => setSelectedFilters("type", type.value)}
            >
              {type.label}
            </Badge>
          ))}
        </div>
      </section>

      <hr className="m-0" />
      <footer className="flex justify-between gap-2">
        <Button
          variant="outline"
          onClick={clearAllFilters}
          disabled={getAppliedFiltersLength() === 0}
        >
          Clear all filters
        </Button>
        <Button
          onClick={() => {
            setApplyFilters(true)
            onClose()
          }}
          disabled={getAppliedFiltersLength() === 0}
        >
          Apply filters
        </Button>
      </footer>
    </main>
  )
}

export default PropertySeachFilterItems
