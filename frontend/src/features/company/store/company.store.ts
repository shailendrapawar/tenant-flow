import { create } from "zustand"

type IuseSearchCompanyFilters = {
  page: number
  limit: number
  selectedfilters: {
    status: string
    name: string
  }
  applyFilters: boolean

  setPage: (newPage: number) => void
  setSelectedFilters: (key: string, value: string) => void
  clearAllFilters: () => void
  setApplyFilters: (applyFilters: boolean) => void
  getAppliedFiltersLength: () => number
}

export const useSearchCompanyFiltersStore = create<IuseSearchCompanyFilters>(
  (set, get) => ({
    page: 1,
    limit: 10,
    applyFilters: false,
    selectedfilters: {
      name: "",
      status: "",
    },

    setPage: (newPage: number) =>
      set({
        page: newPage,
      }),

    setSelectedFilters: (key: string, value: string) => {
      const filters = get().selectedfilters
      set({
        selectedfilters: {
          ...filters,
          [key]: value,
        },
      })
    },

    clearAllFilters: () => {
      set({
        selectedfilters: {
          name: "",
          status: "",
        },
        applyFilters: false,
      })
    },

    setApplyFilters: (value: boolean) => {
      set({
        applyFilters: value,
      })
    },
    getAppliedFiltersLength: () => {
      const { status } = get().selectedfilters
      let count = 0

      // if (name.trim() != "") count++
      if (status.trim() != "") count++

      return count
    },
  })
)
