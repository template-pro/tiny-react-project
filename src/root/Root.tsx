import React from 'react'
import { ConfigProvider } from 'antd'
import { Outlet } from 'react-router-dom'
import { envConfig } from '@/shared/config'
import { store, StoreContext } from '@/models/Store'

const { prefixCls } = envConfig

ConfigProvider.config({
  prefixCls,
})

const Root = () => (
  <StoreContext.Provider value={store}>
    <ConfigProvider
      prefixCls={prefixCls}
    >
      <Outlet />
    </ConfigProvider>
  </StoreContext.Provider>
)

Root.displayName = 'Root'

export default Root
