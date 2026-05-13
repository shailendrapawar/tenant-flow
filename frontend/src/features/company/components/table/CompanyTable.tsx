import React from "react"
import {
  createColumnHelper,
  createTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { companyTableColumns } from "./CompanyTableColunms"

const CompanyTable = ({ data }: { data: [] }) => {
  const table = useReactTable({
    data,
    columns: companyTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="hide-scrollbar flex h-auto w-full flex-col gap-5 overflow-x-scroll rounded-xl border bg-card p-4">
      <table className="w-full min-w-150">
        <thead className="bg-muted">
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header: any) => (
                <th key={header.id} className="p-3 text-left text-sm">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="cursor-pointer">
          {table.getRowModel().rows.map((row: any) => (
            <tr key={row.id} className="border-t hover:bg-muted/50">
              {row.getVisibleCells().map((cell: any) => (
                <td key={cell.id} className="p-3 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompanyTable
