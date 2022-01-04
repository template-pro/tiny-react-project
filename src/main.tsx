import React from 'react'
import ReactDOM from 'react-dom'
import Root from '@/root/Root'
import { locale } from '@/shared/intl'
import RootRouter from '@/root/RootRouter'

locale.initialize()

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <RootRouter />
    </Root>
  </React.StrictMode>,
  document.getElementById('root'),
)
