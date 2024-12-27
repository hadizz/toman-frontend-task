import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '../ui/input'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
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

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const handleReset = () => {
    window.history.pushState({}, '', window.location.pathname)
    table.resetColumnFilters()
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map((column) => (
            <Input
              key={column.id}
              placeholder={`Filter ${column.title}...`}
              value={(table.getColumn(column.id)?.getFilterValue() as string) ?? ''}
              onChange={(event) => {
                table.getColumn(column.id)?.setFilterValue(event.target.value)
              }}
              className="h-8 w-[150px] lg:w-[250px]"
            />
          ))}
        {filterableColumns.length > 0 &&
          filterableColumns.map(({ id, title, options }) => (
            <DataTableFacetedFilter<TData>
              key={id}
              columnKey={id}
              title={title}
              table={table}
              options={options}
              paramName={id}
            />
          ))}
        {isFiltered && (
          <Button variant="ghost" onClick={handleReset} className="h-8 px-2 lg:px-3">
            Reset all
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
