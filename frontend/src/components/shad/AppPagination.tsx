import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "../ui/button"

type PaginationState = {
  currentPage: number
  totalPages: number
  changePage: (page: number) => void
}

export function AppPagination({
  paginationState,
}: {
  paginationState: PaginationState
}) {
  const hasNext = paginationState.currentPage < paginationState.totalPages
  const hasPrevious = paginationState.currentPage > 1

  return (
    <Pagination className="">
      <PaginationContent className="rounded-lg bg-card px-5 py-2">
        {/* PREVIOUS PAGE */}
        <div
          className="flex gap-1"
          onClick={() =>
            paginationState.changePage(paginationState.currentPage - 1)
          }
        >
          <Button
            variant={"ghost"}
            className="text-foreground"
            disabled={paginationState.currentPage === 1}
          >
            <PaginationPrevious />
          </Button>
          <PaginationItem>
            {hasPrevious && (
              <PaginationLink className="">
                {paginationState.currentPage - 1}
              </PaginationLink>
            )}
          </PaginationItem>
        </div>

        {/* CURRENT PAGE */}
        <PaginationItem>
          <PaginationLink isActive>
            {paginationState.currentPage}
          </PaginationLink>
        </PaginationItem>

        {/* NEXT PAGE */}
        <div className="flex">
          <PaginationItem>
            {hasNext && (
              <PaginationLink>{paginationState.currentPage + 1}</PaginationLink>
            )}
          </PaginationItem>

          <PaginationItem onClick={(e) => e.stopPropagation()}>
            <PaginationEllipsis />
          </PaginationItem>

          {!(paginationState.currentPage + 1 >= paginationState.totalPages) && (
            <PaginationItem
              onClick={(e) => {
                paginationState.changePage(paginationState.totalPages)
                e.stopPropagation()
              }}
            >
              <PaginationLink>{paginationState.totalPages}</PaginationLink>
            </PaginationItem>
          )}

          <Button
            className="text-foreground"
            variant={"ghost"}
            disabled={!hasNext}
            onClick={() =>
              paginationState.changePage(paginationState.currentPage + 1)
            }
          >
            <PaginationNext />
          </Button>
        </div>
      </PaginationContent>
    </Pagination>
  )
}
