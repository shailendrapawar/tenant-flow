import CompaniesStats from "../components/CompaniesStats"
import CompanyTable from "../components/table/CompanyTable"
import useGetAllCompanies from "../hooks/useSearchCompanies"
import AppLoader from "@/components/AppLoader"
import { AppPagination } from "@/components/shad/AppPagination"
import CompanySearchFilterMenu from "../components/CompanySearchFilterMenu"
import { useSearchCompanyFiltersStore } from "../store/company.store"

const CompaniesListPage = () => {
  const { page, limit, setPage } = useSearchCompanyFiltersStore()

  const { data, isLoading } = useGetAllCompanies()

  if (isLoading) return <AppLoader message="Retrieving companies..." />

  return (
    <main className="flex h-full w-full flex-col gap-5 p-5">
      <div className="">
        <h1 className="text-lg sm:text-2xl">Companies</h1>
        <p className="mt-2 text-sm sm:text-lg">Manage all companies </p>
      </div>

      <CompaniesStats />
      <hr className="max-w-100 border" />

      {/* LATER: here can toggle between cards and tables view */}
      <CompanySearchFilterMenu />

      <CompanyTable data={data?.companies || []} />

      <AppPagination
        paginationState={{
          currentPage: page,
          totalPages: Math.ceil(data?.count / limit) || 1,
          changePage: (page: number) => {
            if (page > 0 && page <= Math.ceil(data?.count / limit)) {
              setPage(page)
            }
          },
        }}
      />
    </main>
  )
}

export default CompaniesListPage
