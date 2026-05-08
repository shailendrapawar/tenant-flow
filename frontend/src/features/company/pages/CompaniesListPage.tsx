import React from "react"
import useGetAllCompanies from "../hooks/useSearchCompanies"

const CompaniesListPage = () => {
  const { data } = useGetAllCompanies()

  console.log(data)
  return <div>CompaniesListPage</div>
}

export default CompaniesListPage
