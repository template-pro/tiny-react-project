import { createContext, useContext } from 'react'
import ModalStore from './ModalStore'

interface Store {
  modalStore: ModalStore
}

export const store: Store = {
  modalStore: new ModalStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
  return useContext(StoreContext)
}
