import { AppDatePicker } from "@/components/shad/AppDatePicker"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSearchCompanyFiltersStore } from "../store/company.store"
import { useModal } from "@/contexts/ModalContext"

const CompanySearchFilterItems = () => {
  const {
    setSelectedFilters,
    clearAllFilters,
    selectedfilters,
    setApplyFilters,
    getAppliedFiltersLength,
  } = useSearchCompanyFiltersStore()

  const { onClose } = useModal()

  return (
    <main className="flex h-auto w-full flex-col gap-8 py-2">
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
          <Badge
            variant={
              selectedfilters?.status == "active"
                ? "selectedFilter"
                : "unSelectedFilter"
            }
            className="px-4 py-4"
            onClick={() => setSelectedFilters("status", "active")}
          >
            Active
          </Badge>
          <Badge
            variant={
              selectedfilters?.status == "inactive"
                ? "selectedFilter"
                : "unSelectedFilter"
            }
            className="px-4 py-4"
            onClick={() => setSelectedFilters("status", "inactive")}
          >
            Inactive
          </Badge>
          <Badge
            variant={
              selectedfilters?.status == "suspended"
                ? "selectedFilter"
                : "unSelectedFilter"
            }
            className="px-4 py-4"
            onClick={() => setSelectedFilters("status", "suspended")}
          >
            Suspended
          </Badge>
          <Badge
            variant={
              selectedfilters?.status == "banned"
                ? "selectedFilter"
                : "unSelectedFilter"
            }
            className="px-4 py-4"
            onClick={() => setSelectedFilters("status", "banned")}
          >
            Banned
          </Badge>
        </div>
      </section>

      {/* LATER: add todos if any increases */}
      {/* <section className="flex h-auto flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2>Joining:</h2>
          <span className="tranistion cursor-pointer text-xs text-primary active:scale-95">
            clear
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pl-5">
          <AppDatePicker placeholder="Start Date" />
          <AppDatePicker placeholder="End Date" />
        </div>
      </section> */}

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
export default CompanySearchFilterItems
