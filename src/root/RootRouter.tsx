import React from 'react'
import { createBrowserHistory, ReactLocation, Router } from 'react-location'
import { Spin } from 'antd'
import { useIntl } from 'react-intl'
import routes from '@/router'
import { locale } from '@/shared/intl'

export const history = createBrowserHistory()

const RootRouter: React.FC = () => {
  const reactLocation = new ReactLocation({ history })
  const intl = useIntl()
  locale.setIntlObject(intl)

  return (
    <Router
      location={reactLocation}
      routes={routes}
      defaultPendingElement={Spin}
    />
  )
}

RootRouter.displayName = 'RootRouter'

export default RootRouter
