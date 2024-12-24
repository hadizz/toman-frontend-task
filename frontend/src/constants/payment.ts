enum PaymentType {
  salary = 'salary',
  bonus = 'bonus',
  commission = 'commission',
  transportation = 'transportation',
  overtime = 'overtime',
}

const paymentTypes = Object.values(PaymentType).map((type) => ({
  label: type.charAt(0).toUpperCase() + type.slice(1),
  value: type,
}))
Object.freeze(paymentTypes)

enum PaymentStatus {
  success = 'success',
  pending = 'pending',
  failed = 'failed',
}

const paymentStatuses = Object.values(PaymentStatus).map((status) => ({
  label: status.charAt(0).toUpperCase() + status.slice(1),
  value: status,
}))
Object.freeze(paymentStatuses)

interface Payment {
  id: string
  type: PaymentType
  value: number
  paid_at: string
  status: PaymentStatus
  description: string | null
}

export { paymentStatuses, paymentTypes }
export type { Payment, PaymentStatus, PaymentType }
