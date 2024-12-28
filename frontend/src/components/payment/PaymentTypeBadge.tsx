import { cn } from '@/lib/utils'

interface PaymentTypeBadgeProps {
  type: string
}

export function PaymentTypeBadge({ type }: PaymentTypeBadgeProps) {
  return (
    <div className="flex">
      <span
        className={cn('inline-flex w-fit items-center rounded-full px-2 py-1 text-xs font-medium', {
          'bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400': type === 'salary',
          'bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-400':
            type === 'bonus',
          'bg-indigo-100 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-400':
            type === 'commission',
          'bg-teal-100 text-teal-700 dark:bg-teal-400/10 dark:text-teal-400':
            type === 'transportation',
          'bg-orange-100 text-orange-700 dark:bg-orange-400/10 dark:text-orange-400':
            type === 'overtime',
        })}
      >
        {type}
      </span>
    </div>
  )
}
