import { useSearchCompanyFiltersStore } from "@/features/company/store/company.store"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { PropertyService } from "../property.service"

const useSearchProperties = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["properties-all"],
    queryFn: async () => {
      const res: any = await PropertyService.search("")
      return res?.data
    },
    staleTime: 1 * 60 * 1000, //1 minute
    placeholderData: keepPreviousData,
  })
  return { isLoading, data, isError, error }
}
export default useSearchProperties
