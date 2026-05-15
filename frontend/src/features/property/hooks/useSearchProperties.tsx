import { useSearchCompanyFiltersStore } from "@/features/company/store/company.store"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { PropertyService } from "../property.service"
import { useSearchPropertyFilterStore } from "../store/property.store"

const useSearchProperties = () => {
  const { page, limit, selectedfilters, applyFilters } =
    useSearchPropertyFilterStore()

  //set filters only when applyFilters==true
  const params =
    applyFilters ||
    selectedfilters.name.length > 2 ||
    selectedfilters.company?.length > 2
      ? { limit, page, selectedfilters }
      : { limit, page, selectedfilters: {} }
  console.log(params)
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["properties-all", { ...params }],
    queryFn: async () => {
      const res: any = await PropertyService.search({ ...params })
      return res?.data
    },
    staleTime: 1 * 60 * 1000, //1 minute
    placeholderData: keepPreviousData,
  })
  return { isLoading, data, isError, error }
}
export default useSearchProperties
