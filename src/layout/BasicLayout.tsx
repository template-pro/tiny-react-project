import React from 'react'
import ErrorBoundary from '@components/ErrorBoundary'

const BasicLayout: React.FC = ({ children }) => {
  return (
    <>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </>
  )
}

BasicLayout.displayName = 'BasicLayout'

export default BasicLayout
