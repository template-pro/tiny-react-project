import React from 'react'
import ErrorBoundary from '@components/ErrorBoundary'
import ModalContainer from '@/shared/components/ModalContainer'
import Emotion from '@/shared/components/Emotion'

interface BasicLayoutProps {
  children?: React.ReactNode
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <>
      <header>
        <Emotion />
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
