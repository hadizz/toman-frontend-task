import { useQuery } from '@tanstack/react-query'
import { paymentsService } from '@/services/payments'
import { PaymentsResponse } from '@/types/payment.dto'

interface UsePaymentsParams {
  type?: string[]
  status?: string[]
  page?: number
  limit?: number
}

export function usePayments(params: UsePaymentsParams) {
  return useQuery<PaymentsResponse>({
    queryKey: ['payments', params],
    queryFn: () => paymentsService.getPayments(params),
    placeholderData: (previousData) => previousData,
  })
}

export function usePayment(id: string) {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => paymentsService.getPayment(id),
    enabled: !!id,
  })
}
