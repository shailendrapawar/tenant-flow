type ConversionType =
  | "numeric-date"
  | "numeric-date-month"
  | "numeric-full"
  | "friendly-full"
  | "friendly-date"
  | "friendly-date-month"

export function formatDate(
  timestampz: string,
  conversionType: ConversionType
): string {
  const date = new Date(timestampz)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  const monthName = date.toLocaleString("default", { month: "long" })

  switch (conversionType) {
    case "numeric-date":
      return day // 07

    case "numeric-date-month":
      return `${day}-${month}` // 07-02

    case "numeric-full":
      return `${day}-${month}-${year}` // 07-02-2002

    case "friendly-full":
      return `${day} ${monthName} ${year}` // 07 July 2002

    case "friendly-date":
      return day // 07

    case "friendly-date-month":
      return `${day} ${monthName}` // 07 July

    default:
      throw new Error(`Unknown conversion type: "${conversionType}"`)
  }
}
