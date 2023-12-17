import React from 'react'
import ErrorBoundary from '@components/ErrorBoundary'
import ModalContainer from '@/shared/components/ModalContainer'
import AllStyles from '@/shared/components/AllStyles'

interface BasicLayoutProps {
  children?: React.ReactNode
}

function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <>
      <header>
        <AllStyles />
      </header>
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
