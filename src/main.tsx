import React from 'react'
import ReactDOM from 'react-dom'
import ConsoleInfo from '@components/ConsoleInfo'
import Root from '@/root/Root'
import { locale } from '@/shared/intl'
import RootRouter from '@/root/RootRouter'

import 'virtual:windi.css'

locale.initialize()

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <ConsoleInfo/>
      <RootRouter />
    </Root>
  </React.StrictMode>,
  document.getElementById('root'),
)
