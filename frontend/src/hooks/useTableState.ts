import { useCallback, useEffect, useState } from 'react'
import { ColumnFiltersState } from '@tanstack/react-table'
import useColumnFilterSearchParams from './useUrlParams'

interface UseTableStateProps {
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

export function useTableState({
  filterableColumns = [],
  searchableColumns = [],
}: UseTableStateProps = {}) {
  const { getParamValues, setParam, searchParams, setSearchParams } = useColumnFilterSearchParams()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  // Initialize state from URL params
  useEffect(() => {
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
  }, [])

  const getTypeOfFilter = useCallback(
    (filter: any) => {
      if (filterableColumns.find((column) => column.id === filter.id)) {
        return 'filter'
      }
      if (searchableColumns.find((column) => column.id === filter.id)) {
        return 'search'
      }
      return 'unknown'
    },
    [filterableColumns, searchableColumns]
  )

  const onColumnFiltersChange = (updater: any) => {
    const changedFilters = typeof updater === 'function' ? updater(columnFilters) : updater

    setColumnFilters(changedFilters)
    changedFilters.map((filterColumn) => {
      if (getTypeOfFilter(filterColumn) === 'filter') {
        setParam(filterColumn.id, filterColumn.value)
      } else {
        setParam(filterColumn.id, filterColumn.value, true)
      }
    })
  }

  const onPaginationChange = (updater: any) => {
    const newPagination = typeof updater === 'function' ? updater(pagination) : updater
    setPagination(newPagination)
    searchParams.set('pageIndex', newPagination.pageIndex.toString())
    searchParams.set('pageSize', newPagination.pageSize.toString())
    setSearchParams(searchParams)
  }

  return {
    columnFilters,
    pagination,
    onColumnFiltersChange,
    onPaginationChange,
  }
}
