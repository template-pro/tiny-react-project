import { makeAutoObservable } from 'mobx'
import type { ModalProps as AntdModalProps } from 'antd'

type ModalProps =Omit<AntdModalProps, 'visible'> & {
  content?: React.ReactNode
}

interface Modal {
  visible: boolean
  modalProps: ModalProps
}

export default class ModalStore {
  modal: Modal = {
    visible: false,
    modalProps: {},
  }

  constructor() {
    makeAutoObservable(this)
  }

  openModal = (modalProps: ModalProps = {}) => {
    this.modal.visible = true
    this.modal.modalProps = modalProps
  }

  closeModal = () => {
    this.modal.visible = false
    this.modal.modalProps = {}
  }
}
