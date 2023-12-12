import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from '@/root/Root'
import RootRouter from '@/root/RootRouter'

import 'virtual:windi.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root>
      <RootRouter />
    </Root>
  </React.StrictMode>,
)
