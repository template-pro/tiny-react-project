import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { locale } from '@/shared/intl'

locale.initialize()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
