import React from 'react'

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    window.console.log({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Ooh, Error!</h1>
          <button
            type="button"
            onClick={
              () => window.location.reload()
            }>
            reload
          </button>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
