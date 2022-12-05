import type { RouteConfig } from './type'

export const swiperDemoPath = '/swiperdemo'

const routes: RouteConfig = {
  path: swiperDemoPath,
  id: 'swiperdemo',
  element: () => import('@/pages/SwiperDemo').then(mod => <mod.default />),
}

export default routes
