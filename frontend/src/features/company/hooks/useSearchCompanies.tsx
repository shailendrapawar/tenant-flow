import { useQuery } from "@tanstack/react-query"
import { CompanyService } from "../company.service"

function useSearchCompanies() {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ["companies-all"],
        queryFn: async () => {
            const res: any = await CompanyService.search("")
            return res?.data
        },
        staleTime: 5 * 60 * 1000,
    })

    return { isLoading, data, isError, error }
}
export default useSearchCompanies