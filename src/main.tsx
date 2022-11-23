import React from 'react'
import ReactDOM from 'react-dom/client'
import ConsoleInfo from '@components/ConsoleInfo'
import Root from '@/root/Root'
import { locale } from '@/shared/intl'
import RootRouter from '@/root/RootRouter'

import 'virtual:windi.css'

locale.initialize()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root>
      <ConsoleInfo />
      <RootRouter />
    </Root>
  </React.StrictMode>,
)
