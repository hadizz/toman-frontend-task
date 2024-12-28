import * as React from 'react'
import { Toast } from '@/components/ui/toast'

interface ToastContextType {
  showToast: (message: string, type?: 'info' | 'error' | 'success') => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<{
    message: string
    type: 'info' | 'error' | 'success'
  } | null>(null)

  const showToast = React.useCallback(
    (message: string, type: 'info' | 'error' | 'success' = 'info') => {
      setToast({ message, type })
    },
    []
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
