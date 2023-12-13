import { Skeleton } from 'antd'
import React, { Suspense } from 'react'
import {
  BrowserRouter,
  useLocation,
  useRoutes,
} from 'react-router-dom'
import { BasicLayout } from '@/layout'

import routes from '~react-pages'

const Outlet = () => {
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

const RootRouter = () => (
  <BrowserRouter>
    <Outlet />
  </BrowserRouter>
)

RootRouter.displayName = 'RootRouter'

export default RootRouter
