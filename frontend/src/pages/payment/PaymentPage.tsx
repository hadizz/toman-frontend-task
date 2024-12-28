import { useEffect, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { DataTable } from '@/components/data-table/data-table'
import { PaymentStatusBadge } from '@/components/payment/PaymentStatusBadge'
import { PaymentTypeBadge } from '@/components/payment/PaymentTypeBadge'
import { paymentStatuses, paymentTypes } from '@/constants/payment'
import { usePayments } from '@/hooks/usePayments'
import { useTableState } from '@/hooks/useTableState'
import { formatCurrency } from '@/lib/format'
import { useToast } from '@/providers/ToastProvider'
import { Payment } from '@/types/payment.dto'

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

const searchableColumns = [
  {
    id: 'description',
    title: 'Search description',
  },
  {
    id: 'value',
    title: 'Value',
  },
]

const PaymentPage = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { isMounted, columnFilters, pagination, onColumnFiltersChange, onPaginationChange } =
    useTableState({
      filterableColumns,
      searchableColumns,
    })

  const columns: ColumnDef<Payment>[] = useMemo(
    () => [
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => <PaymentTypeBadge type={row.getValue('type')} />,
      },
      {
        accessorKey: 'value',
        header: 'Value',
        cell: ({ row }) => formatCurrency(row.getValue('value')),
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
        cell: ({ row }) => <PaymentStatusBadge status={row.getValue('status')} />,
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const payment = row.original
          return (
            <button
              onClick={() => navigate(`/payments/${payment.id}`)}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              View Details
            </button>
          )
        },
      },
    ],
    [navigate]
  )

  const queryParams = useMemo(
    () => ({
      search: columnFilters.find((f) => f.id === 'description')?.value as string | undefined,
      type: columnFilters.find((f) => f.id === 'type')?.value as string[] | undefined,
      status: columnFilters.find((f) => f.id === 'status')?.value as string[] | undefined,
      page: pagination.pageIndex,
      limit: pagination.pageSize,
    }),
    [columnFilters, pagination]
  )

  const { data, isError, status, isFetching, error } = usePayments(isMounted ? queryParams : {}, {
    retry: (retrycount, error) => {
      console.log('retrycount', retrycount)
      console.log('error', error)
      showToast(`Error loading payments. Retrying...`, 'error')
      return retrycount < 3
    },
  })

  const pageCount = useMemo(() => {
    if (!data?.total) return 0
    return Math.ceil(data.total / data.limit)
  }, [data?.total, data?.limit])

  useEffect(() => {
    if (status === 'success') {
      onPaginationChange({
        pageIndex: data.page - 1,
        pageSize: data.limit,
      })
    }
  }, [status])

  if (isError) {
    return <div>Error loading payments, {error?.message}</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>{`Payments ${data?.total ? `(${data.entities.length})` : ''}`}</h2>
      <DataTable
        loading={!isMounted || isFetching}
        columns={columns}
        data={data?.entities || []}
        columnFilters={columnFilters}
        pagination={pagination}
        pageCount={pageCount}
        onColumnFiltersChange={onColumnFiltersChange}
        onPaginationChange={onPaginationChange}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
      />
    </div>
  )
}

export default PaymentPage
