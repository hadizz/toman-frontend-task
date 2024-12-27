import { BrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ThemeProvider } from '@/providers/ThemeProvider'
import PaymentPage from './pages/payment/PaymentPage'
import ErrorBoundary from './providers/ErrorBoundry'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <ErrorBoundary>
          <DashboardLayout>
            <PaymentPage />
          </DashboardLayout>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
