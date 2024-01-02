import React from 'react'
import ReactDOM from 'react-dom/client'
import pkg from '../package.json'
import Root from '@/root/Root'
import RootRouter from '@/root/RootRouter'

import 'virtual:windi.css'

import routes from '~react-pages'

window.console.log(`%c${pkg.name.toLocaleUpperCase()} => main.tsx`, 'color:#0B7EA4;', {
  routes,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RootRouter>
    </RootRouter>
    <Root />

  </React.StrictMode>,
)
