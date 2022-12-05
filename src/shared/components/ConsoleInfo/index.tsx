import React from 'react'
import { useIntl } from 'react-intl'
import { locale, messages } from '@/shared/intl'

interface ConsoleInfoProps {
  children?: React.ReactNode
}

const ConsoleInfo = ({ children }: ConsoleInfoProps) => {
  const intl = useIntl()
  locale.setIntlObject(intl)

  React.useEffect(() => {
    window.console.log(
      `Website current language: %c${intl.formatMessage(messages._)}`,
      'color:#40a9ff; font-weight:bold;')
  }, [])

  return <>{children}</>
}

ConsoleInfo.displayName = 'ConsoleInfo'

export default ConsoleInfo
