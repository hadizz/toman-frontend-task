import { PaymentStatus, PaymentType } from '@/types/payment.dto'

const paymentTypes = Object.values(PaymentType).map((type) => ({
  label: type.charAt(0).toUpperCase() + type.slice(1),
  value: type,
}))
Object.freeze(paymentTypes)

const paymentStatuses = Object.values(PaymentStatus).map((status) => ({
  label: status.charAt(0).toUpperCase() + status.slice(1),
  value: status,
}))
Object.freeze(paymentStatuses)

export { paymentStatuses, paymentTypes }
