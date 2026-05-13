import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { CompanyService } from "../company.service"

function useSearchCompanies(params: any) {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["companies-all", { ...params }],
    queryFn: async () => {
      const res: any = await CompanyService.search(params)
      return res?.data
    },
    staleTime: 1 * 60 * 1000, //1 minute
    placeholderData: keepPreviousData,
  })

  return { isLoading, data, isError, error }
}
export default useSearchCompanies
