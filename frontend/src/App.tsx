import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ThemeProvider } from '@/providers/ThemeProvider'
import PaymentPage from './pages/payment/PaymentPage'
import ErrorBoundary from './providers/ErrorBoundry'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <ErrorBoundary>
            <DashboardLayout>
              <PaymentPage />
            </DashboardLayout>
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
