import { Button, Space } from 'antd'
import React from 'react'
import { useThrottleFn } from 'ahooks'
import { useStore } from '@/models/Store'
import { DEBOUNCE_WAIT_TIME } from '@/shared/const/common'

function Dashboard() {
  const [count, setCount] = React.useState(0)
  const {
    modalStore: { openModal, closeModal },
  } = useStore()

  // NOTE: Intentionally
  React.useEffect(() => {
    if (count > 5)
      throw new Error('count error')
  }, [count])

  const handlerOpenModal = () => {
    openModal({
      title: 'modal title',
      content: <p>modal body</p>,
      footer: <Button onClick={closeModal}>close modal</Button>,
    })
  }

  const { run: handlerClick } = useThrottleFn(
    () => setCount(prev => prev + 1),
    { wait: DEBOUNCE_WAIT_TIME },
  )

  return (
    <>
      <p>{count}</p>
      <Space>
        <Button onClick={handlerClick}>add</Button>
        <Button onClick={handlerOpenModal}>Open Modal</Button>
      </Space>
    </>
  )
}

Dashboard.displayName = 'Dashboard'

export default Dashboard
