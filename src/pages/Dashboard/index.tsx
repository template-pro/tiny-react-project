import React from 'react'
import { useUpdateEffect } from 'ahooks'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { usePreviousRef, usePreviousState, useRefState } from '@/shared/hooks'

const Dashboard: React.FC = () => {
  // const [value, update] = useRefState(0)
  const [value, update] = usePreviousState(0)
  // const [value, update] = usePreviousRef(0)

  React.useEffect(() => {
    window.console.log('mount')
  }, [])

  useUpdateEffect(() => {
    window.console.log('re-render')
  })

  return (
    <div>
      <p>value: {value}</p>
      <button
        type="button"
        onClick={() => update(v => v + 1)}
      >
        click
      </button>
    </div>
  )
}

export default Dashboard
