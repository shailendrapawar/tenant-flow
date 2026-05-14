// SERVICE
export type ISearchCompanyPayload = {
  limit?: number | string
  page?: number | string

  selectedfilters?: {
    name?: string
    status?: string
  }
}
