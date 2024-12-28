import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { ToastProvider } from '@/providers/ToastProvider'
import PaymentDetailPage from './pages/payment/PaymentDetailPage'
import PaymentPage from './pages/payment/PaymentPage'
import ErrorBoundary from './providers/ErrorBoundry'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <ToastProvider>
            <ErrorBoundary>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<PaymentPage />} />
                  <Route path="/payments/:id" element={<PaymentDetailPage />} />
                </Routes>
              </DashboardLayout>
            </ErrorBoundary>
          </ToastProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
