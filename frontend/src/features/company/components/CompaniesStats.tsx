const CompaniesStats = () => {
  const companyStatsType = ["Total", "Active", "Suspended", "Banned"]
  return (
    <div className="grid h-20 w-full grid-cols-2 gap-4 sm:grid-cols-4">
      {companyStatsType?.map((v, i) => (
        <section key={i} className="h-25 rounded-md border bg-card p-1">
          {v}
        </section>
      ))}
    </div>
  )
}

export default CompaniesStats
