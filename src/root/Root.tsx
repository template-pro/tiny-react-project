import React from 'react'
import { ConfigProvider } from 'antd'
import { envConfig } from '@/shared/config'
import { store, StoreContext } from '@/models/Store'

const { prefixCls } = envConfig

ConfigProvider.config({
  prefixCls,
})

interface RootProps {
  children: React.ReactNode
}

const Root = ({ children }: RootProps) => (
  <StoreContext.Provider value={store}>
    <ConfigProvider
      prefixCls={prefixCls}
    >
      {children}
    </ConfigProvider>
  </StoreContext.Provider>
)

Root.displayName = 'Root'

export default Root
