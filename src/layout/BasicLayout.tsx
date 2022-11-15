import React from 'react'
import ErrorBoundary from '@components/ErrorBoundary'
import ModalContainer from '@/shared/components/ModalContainer'

const BasicLayout: React.FC = ({ children }) => {
  return (
    <>
      <p>header</p>
      <hr />
      <ErrorBoundary>
        <ModalContainer />
        {children}
      </ErrorBoundary>
    </>
  )
}

BasicLayout.displayName = 'BasicLayout'

export default BasicLayout
