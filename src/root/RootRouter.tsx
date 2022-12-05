import { createBrowserHistory, ReactLocation, Router } from '@tanstack/react-location'
import { Spin } from 'antd'
import { useIntl } from 'react-intl'
import { DEBOUNCE_WAIT_TIME } from '@const/common'
import routes from '@/router'
import { locale } from '@/shared/intl'

export const history = createBrowserHistory()

const RootRouter = () => {
  const reactLocation = new ReactLocation({ history })
  const intl = useIntl()
  locale.setIntlObject(intl)

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
