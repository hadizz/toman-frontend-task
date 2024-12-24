import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary: ', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-4">
          <h1 className="text-2xl font-bold text-red-500">Something went wrong! 🐒</h1>
          <pre>Please refresh the page or contact support.</pre>
          <code className="rounded-md border p-4 text-sm text-muted-foreground">
            {this.state.error?.message}
          </code>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
