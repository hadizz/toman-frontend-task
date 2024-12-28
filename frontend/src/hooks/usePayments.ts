import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { paymentsService } from '@/services/payments'
import { PaymentsResponse } from '@/types/payment.dto'

interface UsePaymentsParams {
  type?: string[]
  status?: string[]
  page?: number
  limit?: number
}

export function usePayments(
  params: UsePaymentsParams,
  options: Omit<
    UseQueryOptions<PaymentsResponse, Error>,
    'queryKey' | 'queryFn' | 'placeholderData' | 'enabled'
  > = {}
) {
  return useQuery<PaymentsResponse>({
    queryKey: ['payments', params],
    queryFn: () => paymentsService.getPayments(params),
    placeholderData: (previousData) => previousData,
    enabled: Object.keys(params).length > 0,
    ...options,
  })
}

export function usePayment(id: string) {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => paymentsService.getPayment(id),
    enabled: !!id,
  })
}