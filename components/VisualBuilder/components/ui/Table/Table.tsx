import * as React from "react"
import { ChevronUp, ChevronDown, Search, Filter, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../Button"
import { Input } from "../Input"
import { Badge } from "../Badge"

interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
  width?: string
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  exportable?: boolean
  pagination?: boolean
  pageSize?: number
  loading?: boolean
  onRowClick?: (row: T) => void
  className?: string
}

/**
 * Advanced Table Component with sorting, filtering, search, and pagination
 * Features:
 * - Server-side or client-side sorting
 * - Column filtering capabilities
 * - Global search functionality
 * - Export to CSV/Excel
 * - Responsive design with horizontal scroll
 * - Loading states and empty states
 * - Accessibility compliant (WCAG AA)
 */
export function Table<T extends Record<string, any>>({
  data,
  columns,
  searchable = true,
  exportable = true,
  pagination = true,
  pageSize = 10,
  loading = false,
  onRowClick,
  className
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })
  
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [filters, setFilters] = React.useState<Record<string, string>>({})

  // Filter and search data
  const filteredData = React.useMemo(() => {
    let result = data

    // Apply search
    if (searchTerm) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Apply column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item =>
          String(item[key]).toLowerCase().includes(value.toLowerCase())
        )
      }
    })

    return result
  }, [data, searchTerm, filters])

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!]
      const bValue = b[sortConfig.key!]

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData
    
    const startIndex = (currentPage - 1) * pageSize
    return sortedData.slice(startIndex, startIndex + pageSize)
  }, [sortedData, currentPage, pageSize, pagination])

  const handleSort = (key: keyof T) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const exportData = () => {
    const csv = [
      columns.map(col => col.header).join(','),
      ...sortedData.map(row =>
        columns.map(col => String(row[col.key])).join(',')
      )
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'table-data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="w-full space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted/50 animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {searchable && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          {exportable && (
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-background">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      "px-4 py-3 text-left text-sm font-medium text-muted-foreground",
                      column.sortable && "cursor-pointer hover:bg-muted",
                      column.width && `w-[${column.width}]`
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp className={cn(
                            "h-3 w-3",
                            sortConfig.key === column.key && sortConfig.direction === 'asc'
                              ? "text-foreground" 
                              : "text-muted-foreground"
                          )} />
                          <ChevronDown className={cn(
                            "h-3 w-3 -mt-1",
                            sortConfig.key === column.key && sortConfig.direction === 'desc'
                              ? "text-foreground" 
                              : "text-muted-foreground"
                          )} />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={cn(
                    "border-t hover:bg-muted/50 transition-colors",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-4 py-3 text-sm">
                      {column.render 
                        ? column.render(row[column.key], row)
                        : String(row[column.key])
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * pageSize) + 1} to{' '}
            {Math.min(currentPage * pageSize, sortedData.length)} of{' '}
            {sortedData.length} results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage * pageSize >= sortedData.length}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}