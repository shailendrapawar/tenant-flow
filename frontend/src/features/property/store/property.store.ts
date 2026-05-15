import { create } from "zustand"

type IuseSearchPropertyFilters = {
  page: number
  limit: number
  selectedfilters: {
    name: string
    status: string
    type: string
    city: string
    company: string
  }
  applyFilters: boolean

  setPage: (newPage: number) => void
  setSelectedFilters: (key: string, value: string) => void
  clearAllFilters: () => void
  setApplyFilters: (applyFilters: boolean) => void
  getAppliedFiltersLength: () => number
}

export const useSearchPropertyFilterStore = create<IuseSearchPropertyFilters>(
  (set, get) => ({
    page: 1,
    limit: 10,
    applyFilters: false,
    selectedfilters: {
      name: "",
      status: "",
      type: "",
      city: "",
      company: "",
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
          type: "",
          city: "",
          company: "",
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
      const { status, type, city } = get().selectedfilters
      let count = 0

      // if (name.trim() != "") count++
      if (status.trim() != "") count++

      if (type.trim() != "") count++

      if (city.trim() != "") count++

      return count
    },
  })
)
