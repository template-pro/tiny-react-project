import { Button, Space } from 'antd'
import React from 'react'
import { useStore } from '@/models/Store'

const Dashboard: React.FC = () => {
  const [count, setCount] = React.useState(0)
  const {
    modalStore: { openModal, closeModal },
  } = useStore()

  // TODO: 故意为之
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

  return (
    <>
      <p>{count}</p>
      <Space>
        <Button onClick={() => setCount(count + 1)}>add</Button>
        <Button onClick={handlerOpenModal}>Open Modal</Button>
      </Space>
    </>
  )
}

Dashboard.displayName = 'Dashboard'

export default Dashboard
