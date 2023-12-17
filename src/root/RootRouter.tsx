import { Skeleton } from 'antd'
import React, { Suspense } from 'react'
import {
  BrowserRouter,
  useLocation,
  useRoutes,
} from 'react-router-dom'
import { BasicLayout } from '@/layout'

import routes from '~react-pages'

function Outlet() {
  const { pathname } = useLocation()

  const Layout = React.useMemo(() => {
    if (pathname.toLowerCase().startsWith('/demos'))
      return React.Fragment

    return BasicLayout
  }, [pathname])

  return (
    <Layout>
      <Suspense fallback={<Skeleton active />}>
        {useRoutes(routes)}
      </Suspense>
    </Layout>
  )
}

function RootRouter() {
  return (
    <BrowserRouter>
      <Outlet />
    </BrowserRouter>
  )
}

RootRouter.displayName = 'RootRouter'

export default RootRouter
