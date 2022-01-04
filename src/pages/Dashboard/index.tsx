import { Button } from 'antd'
import React from 'react'

const Dashboard: React.FC = () => {
  const [count, setCount] = React.useState(0)

  // TODO: 故意为之
  React.useEffect(() => {
    if (count > 5)
      throw new Error('count error')
  }, [count])

  return (
    <>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>add</Button>
    </>
  )
}

Dashboard.displayName = 'Dashboard'

export default Dashboard
