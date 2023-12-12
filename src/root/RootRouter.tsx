import { createBrowserHistory, ReactLocation, Router } from '@tanstack/react-location'
import { Spin } from 'antd'
import { DEBOUNCE_WAIT_TIME } from '@const/common'
import routes from '@/router'

export const history = createBrowserHistory()

const RootRouter = () => {
  const reactLocation = new ReactLocation({ history })

  return (
    <Router
      location={reactLocation}
      routes={routes}
      defaultPendingMs={0}
      defaultPendingMinMs={DEBOUNCE_WAIT_TIME}
      defaultPendingElement={<Spin />}
    />
  )
}

RootRouter.displayName = 'RootRouter'

export default RootRouter
