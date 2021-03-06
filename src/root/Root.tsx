import React from 'react'
import { IntlProvider } from 'react-intl'
import { ConfigProvider } from 'antd'
import { CN } from '@const/languages'
import { antdLocaleMap } from '@const/languages/localeTypes'
import { locale } from '@/shared/intl'
import { envConfig } from '@/shared/config'

const { prefixCls } = envConfig

ConfigProvider.config({
  prefixCls,
})

const DEFAULT_LOCALE = CN

const Root: React.FC = ({ children }) => (
  <IntlProvider
    defaultLocale={locale.currentLocale}
    locale={locale.currentLocale || DEFAULT_LOCALE}
    messages={locale.getMessages()}
  >
    <ConfigProvider
      prefixCls={prefixCls}
      locale={antdLocaleMap[locale.currentLocale || DEFAULT_LOCALE]}>
      {children}
    </ConfigProvider>
  </IntlProvider>
)

Root.displayName = 'Root'

export default Root
