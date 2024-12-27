import { useEffect, useState } from 'react'
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
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useColumnFilterSearchParams from '@/hooks/useUrlParams'
import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
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

export function DataTable<TData, TValue>({
  columns,
  data,
  filterableColumns = [],
  searchableColumns = [],
}: DataTableProps<TData, TValue>) {
  console.log('render table')
  const { getParamValues, setParam, searchParams, setSearchParams } = useColumnFilterSearchParams()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    console.log('--------------------------------component mounted')

    // Filters
    const initialFilters = filterableColumns
      .map(({ id }) => {
        const urlValues = getParamValues(id)
        return urlValues.length > 0
          ? {
              id,
              value: urlValues,
            }
          : null
      })
      .filter(Boolean) as ColumnFiltersState

    if (initialFilters.length > 0) {
      setColumnFilters(initialFilters)
    }

    // Pagination
    const pageIndexParam = searchParams.get('pageIndex')
    const pageSizeParam = searchParams.get('pageSize')
    console.log('pageIndexParam', pageIndexParam)
    console.log('pageSizeParam', pageSizeParam)

    if (pageIndexParam && pageSizeParam) {
      setPagination({
        pageIndex: parseInt(pageIndexParam, 10),
        pageSize: parseInt(pageSizeParam, 10),
      })
    } else {
      searchParams.set('pageIndex', pagination.pageIndex.toString())
      searchParams.set('pageSize', pagination.pageSize.toString())
      setSearchParams(searchParams)
    }
    // I didnt have search filters in the url params, so I dont code it now :_)
  }, [])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: (updater) => {
      const changedFilters = typeof updater === 'function' ? updater(columnFilters) : updater
      setColumnFilters(changedFilters)
      changedFilters.map((filterColumn) => {
        setParam(filterColumn.id, filterColumn.value as any)
      })
    },
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater
      console.log('newPagination', newPagination)

      setPagination(newPagination)
      searchParams.set('pageIndex', newPagination.pageIndex.toString())
      searchParams.set('pageSize', newPagination.pageSize.toString())
      setSearchParams(searchParams)
    },
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
      <DataTablePagination table={table} />
    </div>
  )
}
