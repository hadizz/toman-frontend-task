import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToastProps {
  message: string
  type?: 'info' | 'error' | 'success'
  onClose: () => void
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 flex transform-gpu items-center gap-2 rounded-md px-6 py-4 shadow-lg transition-transform',
        {
          'bg-blue-500 text-white': type === 'info',
          'bg-red-500 text-white': type === 'error',
          'bg-green-500 text-white': type === 'success',
          'translate-y-0 opacity-100': true,
          'translate-y-4 opacity-0': false,
        }
      )}
      style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
    >
      <span>{message}</span>
      <button onClick={onClose} className="rounded-full p-1 hover:bg-white/20">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
