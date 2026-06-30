import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error)
    console.error('Component stack:', errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold text-[#18324a]">
              Something went wrong
            </h1>

            <p className="mt-4 text-[#617284]">
              An unexpected error occurred. Please refresh the page and try again.
            </p>

            <button
              onClick={this.handleReload}
              className="mt-6 rounded-full bg-[#18324a] px-6 py-3 font-semibold text-white transition hover:bg-[#254861]"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}