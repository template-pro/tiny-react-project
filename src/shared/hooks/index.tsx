import { useEffect, useRef, useState } from 'react'
import usePrevious from 'ahooks/lib/usePrevious'

export function useRefState<T>(initialState: T | (() => T)) {
  const [state, setState] = useState<T>(initialState)
  const ref = useRef<T>(state)
  useEffect(() => {
    ref.current = state
  }, [state])
  return [ref.current, setState] as const
}

export function usePreviousState<V>(initialState: V) {
  const [state, setState] = useState<V>(initialState)
  const previous = usePrevious(state)
  return [previous, setState] as const
}

export function usePreviousRef<T>(value: T) {
  const ref = useRef<T>(value)
  const update = (v: T | ((v: T) => T)) => {
    if (typeof v === 'function')
      ref.current = (v as ((v: T) => T))(ref.current)

    else
      ref.current = v
  }
  return [ref.current, update] as const
}
