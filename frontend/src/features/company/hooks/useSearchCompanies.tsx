import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { CompanyService } from "../company.service"
import { useSearchCompanyFiltersStore } from "../store/company.store"

function useSearchCompanies() {
  const { page, limit, selectedfilters, applyFilters } =
    useSearchCompanyFiltersStore()

  //set filters only when applyFilters==true
  const params =
    applyFilters || selectedfilters.name.length > 2
      ? { limit, page, selectedfilters }
      : { limit, page, selectedfilters: {} }

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["companies-all", { ...params }],
    queryFn: async () => {
      const res: any = await CompanyService.search({ ...params })
      return res?.data
    },
    staleTime: 1 * 60 * 1000, //1 minute
    placeholderData: keepPreviousData,
  })

  return { isLoading, data, isError, error }
}
export default useSearchCompanies
