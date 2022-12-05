import { Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/models/Store'

const ModalContainer = observer(() => {
  const {
    modalStore: { modal, closeModal },
  } = useStore()

  const {
    visible,
    modalProps,
  } = modal

  const {
    footer = null,
    onCancel = closeModal,
    content,
    ...restModalProps
  } = modalProps

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={footer}
      {...restModalProps}
    >
      {content}
    </Modal>
  )
})

export default ModalContainer
