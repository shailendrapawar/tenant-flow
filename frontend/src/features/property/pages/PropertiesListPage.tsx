import React from "react"
import { PropertyService } from "../property.service"
import PropertiesStats from "../components/PropertiesStats"
import { Button } from "@/components/ui/button"
import useSearchProperties from "../hooks/useSearchProperties"
import AppTable from "@/components/table/AppTable"
import PropertyTableColumns from "../components/table/PropertyTableColumns"
import AppLoader from "@/components/AppLoader"

const PropertiesListPage = () => {
  const { data, isLoading } = useSearchProperties()

  if (isLoading) return <AppLoader message="Retrieving properties..." />

  return (
    <main className="flex h-full w-full flex-col items-center gap-5 p-5">
      <div className="relative w-full">
        <h1 className="text-lg text-primary-foreground sm:text-2xl">
          Properties
        </h1>
        <p className="mt-2 text-sm text-secondary-foreground sm:text-lg">
          Manage all Properties{" "}
        </p>
        {/* <Button className="absolute top-0 right-0 text-xs">Add Property</Button> */}
      </div>

      <PropertiesStats />
      <hr className="w-full max-w-100 border" />

      <AppTable
        data={data?.properties || []}
        columns={PropertyTableColumns || []}
      />
    </main>
  )
}

export default PropertiesListPage
