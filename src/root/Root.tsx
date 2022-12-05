import React from 'react'
import { IntlProvider } from 'react-intl'
import { ConfigProvider } from 'antd'
import { CN } from '@const/languages'
import { antdLocaleMap } from '@const/languages/localeTypes'
import { locale } from '@/shared/intl'
import { envConfig } from '@/shared/config'
import { store, StoreContext } from '@/models/Store'

const { prefixCls } = envConfig

ConfigProvider.config({
  prefixCls,
})

const DEFAULT_LOCALE = CN

interface RootProps {
  children: React.ReactNode
}

const Root = ({ children }: RootProps) => (
  <IntlProvider
    defaultLocale={locale.currentLocale}
    locale={locale.currentLocale || DEFAULT_LOCALE}
    messages={locale.getMessages()}
  >
    <StoreContext.Provider value={store}>
      <ConfigProvider
        prefixCls={prefixCls}
        locale={antdLocaleMap[locale.currentLocale || DEFAULT_LOCALE]}>
        {children}
      </ConfigProvider>
    </StoreContext.Provider>
  </IntlProvider>
)

Root.displayName = 'Root'

export default Root
