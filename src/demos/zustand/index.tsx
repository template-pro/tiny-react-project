import { Button } from 'antd'
import { find } from 'lodash-es'
import { Link } from 'react-router-dom'
import routes from '~react-pages'

const zustandDemo = find(routes, { path: 'demos' })?.children?.find((route) => {
  return route.path === 'zustand'
})

function ZustandDemo() {
  // TODO: Should be deleted. assign: @Wuxh<wxh1220@gmail.com>
  globalThis.console.log('%c@Wuxh(Red)', 'color:red;', {
    zustandDemo,
  })

  return (
    <>
      <h1>Zustand Demo</h1>
      {zustandDemo?.children?.map((route) => {
        return (
          <Link to={route.path!} key={route.path}>
            <Button type="link">{route.path}</Button>
          </Link>
        )
      })}
      <pre hidden>{JSON.stringify(zustandDemo, null, 2)}</pre>
    </>
  )
}

export default ZustandDemo
