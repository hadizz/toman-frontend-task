import { cn } from '@/lib/utils'

interface PaymentStatusBadgeProps {
  status: string
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  return (
    <div className="flex">
      <span
        className={cn('inline-flex w-fit items-center rounded-full px-2 py-1 text-xs font-medium', {
          'bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400':
            status === 'success',
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-400/10 dark:text-yellow-400':
            status === 'pending',
          'bg-red-100 text-red-700 dark:bg-red-400/10 dark:text-red-400': status === 'failed',
        })}
      >
        {status}
      </span>
    </div>
  )
}
