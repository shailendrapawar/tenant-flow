import CompaniesStats from "../components/CompaniesStats"
import CompanyTable from "../components/CompanyTable"
import useGetAllCompanies from "../hooks/useSearchCompanies"
import AppLoader from "@/components/AppLoader"

const CompaniesListPage = () => {
  const { data, isLoading } = useGetAllCompanies()

  if (isLoading) return <AppLoader message="Retrieving companies..." />
  return (
    <main className="flex h-full w-full flex-col gap-5 p-5">
      <div className="">
        <h1 className="text-lg sm:text-2xl">Companies</h1>
        <p className="mt-2 text-sm sm:text-lg">Manage all companies </p>
      </div>
      <CompaniesStats />
      <CompanyTable data={data?.companies || []} />
    </main>
  )
}

export default CompaniesListPage
