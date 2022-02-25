import { Navigate, Outlet } from 'react-location'
import dashboardRoutes, { dashboardPath } from './dashboardRoutes'
import swiperDemoRoutes from './swiperDemoRoutes'
import type { RouteConfig } from './type'
import { BasicLayout } from '@/layout'

const router: RouteConfig[] = [
  {
    path: '/',
    id: 'layout',
    element: (
      <BasicLayout>
        <Outlet />
      </BasicLayout>
    ),
    children: [
      {
        path: '/',
        id: 'redirect',
        element: <Navigate to={dashboardPath} />,
      },
      dashboardRoutes,
      swiperDemoRoutes,
    ],
  },
]

export default router
