import CompaniesStats from "../components/CompaniesStats"
import useGetAllCompanies from "../hooks/useSearchCompanies"
import AppLoader from "@/components/AppLoader"

const CompaniesListPage = () => {
  const { data, isLoading } = useGetAllCompanies()

  if (isLoading) return <AppLoader message="Retrieving companies..." />
  return (
    <main className="flex h-full w-full flex-col gap-5 p-5">
      <div className="">
        <h1 className="text-xl">Companies</h1>
        <p className="mt-2">Manage all companies </p>
      </div>
      <CompaniesStats />
    </main>
  )
}

export default CompaniesListPage
