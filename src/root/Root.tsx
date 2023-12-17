import React from 'react'
import { ConfigProvider } from 'antd'
import { Outlet } from 'react-router-dom'
import { envConfig } from '@/shared/config'
import { StoreContext, store } from '@/models/Store'

const { prefixCls } = envConfig

ConfigProvider.config({
  prefixCls,
})

function Root() {
  return (
    <StoreContext.Provider value={store}>
      <ConfigProvider
        prefixCls={prefixCls}
      >
        <Outlet />
      </ConfigProvider>
    </StoreContext.Provider>
  )
}

Root.displayName = 'Root'

export default Root
