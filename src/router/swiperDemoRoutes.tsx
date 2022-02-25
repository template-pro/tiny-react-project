import type { RouteConfig } from './type'
import SwiperDemo from '@/pages/SwiperDemo'

export const swiperDemoPath = '/swiperdemo'

const routes: RouteConfig = {
  path: swiperDemoPath,
  id: 'swiperdemo',
  element: <SwiperDemo />,
}

export default routes
