export type ISearchPropertyPayload = {
  limit?: number | string
  page?: number | string

  selectedfilters?: {
    name?: string
    status?: string
    type?: string
    company?: string
  }
}
