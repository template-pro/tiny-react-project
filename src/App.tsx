import React from 'react'
import { Button } from 'antd'
import { IntlProvider, useIntl } from 'react-intl'
import { locale, messages } from '@/shared/intl'
import { CN } from '@/shared/const/languages'

import './App.less'

const InitalIntl: React.FC = ({ children }) => {
  const intl = useIntl()
  locale.setIntlObject(intl)

  React.useEffect(() => {
    window.console.log(
      `Website current language: %c${intl.formatMessage(messages._)}`,
      'color:#40a9ff; font-weight:bold;')
  }, [])

  return <>{children}</>
}

const CnfigProvider: React.FC = ({ children }) => {
  return (
    <IntlProvider
      locale={locale.currentLocale || CN}
      defaultLocale={locale.currentLocale}
      messages={locale.getMessages()}
    >
      <InitalIntl>{children}</InitalIntl>
    </IntlProvider>
  )
}

const App: React.FC = ({ children }) => {
  return (
    <CnfigProvider>
      <div className="app">
        <Button>App</Button>
      </div>
      {children}
    </CnfigProvider>
  )
}

export default App
