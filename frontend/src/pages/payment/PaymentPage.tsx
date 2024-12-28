import { useEffect, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table/data-table'
import { paymentStatuses, paymentTypes } from '@/constants/payment'
import { usePayments } from '@/hooks/usePayments'
import { useTableState } from '@/hooks/useTableState'
import { Payment } from '@/types/payment.dto'

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
  {
    accessorKey: 'paid_at',
    header: 'Paid At',
    cell: ({ cell }) => {
      const dateValue = cell.getValue<string>()
      const date = new Date(dateValue)
      if (isNaN(date.getTime())) {
        return ''
      }
      const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '/').slice(2)
      return formattedDate
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
]
const filterableColumns = [
  {
    id: 'type',
    title: 'Type',
    options: paymentTypes,
  },
  {
    id: 'status',
    title: 'Status',
    options: paymentStatuses,
  },
]

const PaymentPage = () => {
  const { columnFilters, pagination, onColumnFiltersChange, onPaginationChange } = useTableState({
    filterableColumns,
  })

  const queryParams = useMemo(
    () => ({
      type: columnFilters.find((f) => f.id === 'type')?.value as string[] | undefined,
      status: columnFilters.find((f) => f.id === 'status')?.value as string[] | undefined,
      page: pagination.pageIndex,
      limit: pagination.pageSize,
    }),
    [columnFilters, pagination]
  )

  const { data, isError, status, isFetching, ...other } = usePayments(queryParams)
  console.log({ data, isError, status, ...other })

  const pageCount = useMemo(() => {
    if (!data?.total) return 0
    return Math.ceil(data.total / data.limit)
  }, [data?.total, data?.limit])

  // Update pagination based on response
  useEffect(() => {
    if (status === 'success') {
      onPaginationChange({
        pageIndex: data.page - 1,
        pageSize: data.limit,
      })
    }
  }, [status])

  if (isError) {
    return <div>Error loading payments</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>{`Payments ${data?.total ? `(${data.entities.length})` : ''}`}</h2>
      <DataTable
        loading={isFetching}
        columns={columns}
        data={data?.entities || []}
        columnFilters={columnFilters}
        pagination={pagination}
        pageCount={pageCount}
        onColumnFiltersChange={onColumnFiltersChange}
        onPaginationChange={onPaginationChange}
        filterableColumns={filterableColumns}
      />
    </div>
  )
}

export default PaymentPage
