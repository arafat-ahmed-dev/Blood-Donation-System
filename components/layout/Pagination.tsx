"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ITEM_PER_PAGE } from "@/lib/constants"

interface PaginationProps {
  page: number
  count: number
}

export default function Pagination({ page, count }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(count / ITEM_PER_PAGE)

  // If there's only one page or less, don't show pagination
  if (totalPages <= 1) {
    return null
  }

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="flex justify-center py-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.push(createPageURL(page - 1))} disabled={page <= 1}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Logic to show pages around the current page
            let pageNum
            if (totalPages <= 5) {
              // If 5 or fewer pages, show all
              pageNum = i + 1
            } else if (page <= 3) {
              // If near the start
              pageNum = i + 1
            } else if (page >= totalPages - 2) {
              // If near the end
              pageNum = totalPages - 4 + i
            } else {
              // In the middle
              pageNum = page - 2 + i
            }

            return (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                size="icon"
                onClick={() => router.push(createPageURL(pageNum))}
              >
                {pageNum}
              </Button>
            )
          })}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push(createPageURL(page + 1))}
          disabled={page >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  )
}
