import React from "react"
const PropertyStatsType = ["Total", "Active", "Suspended", "Banned"]

const PropertiesStats = () => {
  return (
    <div className="grid h-auto w-full grid-cols-2 gap-4 sm:grid-cols-4">
      {PropertyStatsType?.map((v, i) => (
        <section key={i} className="h-25 rounded-md border bg-card p-1">
          {v}
        </section>
      ))}
    </div>
  )
}

export default PropertiesStats
