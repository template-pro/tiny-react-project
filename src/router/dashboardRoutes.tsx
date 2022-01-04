import type { RouteConfig } from './type'
import Dashboard from '@/pages/Dashboard'

export const dashboardPath = '/dashboard'

const routes: RouteConfig = {
  path: dashboardPath,
  id: 'dashboard',
  element: <Dashboard />,
}

export default routes
