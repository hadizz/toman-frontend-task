import axiosInstance from '@/lib/axios'
import { Payment, PaymentsResponse } from '@/types/payment.dto'

interface FetchPaymentsParams {
  search?: string
  type?: string[]
  status?: string[]
  page?: number
  limit?: number
}

export const paymentsService = {
  getPayments: async ({
    search,
    type,
    status,
    page,
    limit,
  }: FetchPaymentsParams): Promise<PaymentsResponse> => {
    const params = new URLSearchParams()

    if (search) params.append('search', search)
    if (type?.length) params.append('type', type.join(','))
    if (status?.length) params.append('status', status.join(','))
    if (page) params.append('page', String(page + 1))
    if (limit) params.append('limit', String(limit))

    const { data } = await axiosInstance.get<PaymentsResponse>(`/payments?${params.toString()}`)
    return data
  },

  getPayment: async (id: string) => {
    const { data } = await axiosInstance.get<Payment>(`/payments/${id}`)
    return data
  },
}
