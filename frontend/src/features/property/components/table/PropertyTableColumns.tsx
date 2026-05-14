import AppCopyIcon from "@/components/AppCopyIcon"
import { AppBadge } from "@/components/shad/AppBadge"
import { formatDate } from "@/utils/date-handler"
import { createColumnHelper } from "@tanstack/react-table"
import React from "react"

const columnHelper = createColumnHelper()
export const PropertyTableColumns: any = [
  columnHelper.accessor("_id", {
    header: () => (
      <div className="flex items-center gap-1">
        <span className="text-secondary">ID</span>
      </div>
    ),
    cell: ({ row }: any) => {
      const id = row?.original?._id

      return (
        <div className="flex items-center gap-1" title={id}>
          <span className="w-20 overflow-hidden text-ellipsis">{id}</span>
          <AppCopyIcon value={id} />
        </div>
      )
    },
  }),

  columnHelper.accessor("name", {
    header: () => (
      <div className="flex items-center justify-start gap-1">
        <span className="text-secondary">Name</span>
      </div>
    ),
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
  }),

  columnHelper.accessor("companyID.owner.firstName", {
    header: () => (
      <div className="flex items-center justify-start gap-1">
        <span className="text-secondary">Owner</span>
      </div>
    ),
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("type", {
    header: () => (
      <div className="flex items-center justify-start gap-1">
        <span className="text-secondary">Type</span>
      </div>
    ),
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("location.city", {
    header: () => (
      <div className="hidden items-center justify-start gap-1 sm:flex">
        <span className="text-secondary">City</span>
      </div>
    ),
    cell: (info) => <span className="hidden sm:flex">{info.getValue()}</span>,
  }),
  columnHelper.accessor("status", {
    header: () => (
      <div className="flex items-center justify-start gap-1">
        <span className="text-secondary">Status</span>
      </div>
    ),
    cell: (info) => <AppBadge status={info.getValue()} />,
  }),
]

export default PropertyTableColumns
