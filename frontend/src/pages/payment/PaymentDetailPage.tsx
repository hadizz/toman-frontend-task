import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { PaymentStatusBadge } from '@/components/payment/PaymentStatusBadge'
import { PaymentTypeBadge } from '@/components/payment/PaymentTypeBadge'
import { usePayment } from '@/hooks/usePayments'
import { formatCurrency } from '@/lib/format'
import { useToast } from '@/providers/ToastProvider'

const PaymentDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const {
    data: payment,
    isLoading,
    isError,
    error,
  } = usePayment(id || '', {
    retry: (retryCount) => {
      showToast('Error loading payment details. Retrying...', 'error')
      return retryCount < 3
    },
  })

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex flex-col gap-4">
      <nav className="flex items-center space-x-2 text-sm">
        <button onClick={handleGoBack} className="text-blue-500 hover:underline">
          <ChevronLeft className="mr-1 inline-block h-4 w-4" />
          Go back to list
        </button>
        <span>/</span>
        <span>Payment Details</span>
      </nav>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="mb-4 h-8 rounded bg-gray-300"></div>
          <div className="mb-2 h-6 rounded bg-gray-300"></div>
          <div className="mb-2 h-6 rounded bg-gray-300"></div>
          <div className="mb-2 h-6 rounded bg-gray-300"></div>
          <div className="mb-2 h-6 rounded bg-gray-300"></div>
          <div className="mb-2 h-6 rounded bg-gray-300"></div>
        </div>
      ) : isError ? (
        <div className="text-red-500">Error loading payment details, {error?.message}</div>
      ) : !payment ? (
        <div className="text-red-500">Payment not found</div>
      ) : (
        <>
          <h2>
            Payment Details{' '}
            <span className="inline-flex items-center rounded-full bg-slate-400 px-2 py-1 text-xs font-medium text-white">
              {payment.id}
            </span>
          </h2>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Type</span>
                <PaymentTypeBadge type={payment.type} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Status</span>
                <PaymentStatusBadge status={payment.status} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Value</span>
                <span className="text-2xl font-bold">{formatCurrency(payment.value)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Paid at</span>
                <span className="text-sm">{new Date(payment.paid_at).toLocaleString()}</span>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Description</span>
                <p className="text-pretty">{payment.description || 'N/A'}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PaymentDetailPage
