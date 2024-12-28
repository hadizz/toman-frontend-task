import { useMemo } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  useReactTable,
} from '@tanstack/react-table'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'

interface DataTableProps<TData, TValue> {
  loading: boolean
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  columnFilters: ColumnFiltersState
  pagination: { pageIndex: number; pageSize: number }
  pageCount: number
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>
  onPaginationChange: OnChangeFn<{ pageIndex: number; pageSize: number }>
  filterableColumns?: {
    id: string
    title: string
    options: {
      label: string
      value: string
    }[]
  }[]
  searchableColumns?: {
    id: string
    title: string
  }[]
}

const defaultPagination = { pageIndex: 0, pageSize: 10 }

export function DataTable<TData, TValue>({
  loading,
  columns,
  data,
  columnFilters,
  pagination,
  pageCount,
  onColumnFiltersChange,
  onPaginationChange,
  filterableColumns = [],
  searchableColumns = [],
}: DataTableProps<TData, TValue>) {
  const dataToRender = useMemo(
    () => (loading ? Array(pagination.pageSize ?? defaultPagination.pageSize).fill({}) : data),
    [loading, data, pagination.pageSize]
  )
  const columnsToRender = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-4 w-full" />,
          }))
        : columns,
    [loading, columns]
  )

  const table = useReactTable({
    data: dataToRender,
    columns: columnsToRender,
    pageCount,
    state: {
      columnFilters,
      pagination,
    },
    manualPagination: true,
    onColumnFiltersChange,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <DataTableToolbar<TData>
        loading={loading}
        table={table}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
      />
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap p-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination loading={loading} table={table} />
    </div>
  )
}
