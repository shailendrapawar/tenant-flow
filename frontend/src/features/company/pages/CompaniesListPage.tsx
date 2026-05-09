import React from "react"
import useGetAllCompanies from "../hooks/useSearchCompanies"
import AppLoader from "@/components/AppLoader"

const CompaniesListPage = () => {
  const { data, isLoading } = useGetAllCompanies()

  if (isLoading) return <AppLoader message="Retrieving companies..." />
  return <div>CompaniesListPage</div>
}

export default CompaniesListPage
