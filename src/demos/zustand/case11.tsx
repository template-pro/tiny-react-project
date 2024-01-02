import { Badge, Button, Card } from 'antd'
import * as React from 'react'
import { z } from 'zod'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import createSelectors from './_utils/createSelectors'

// const immer = (args) => args;

const topicDesc = `
  1. getState 解耦 action 和 store
  see: https://docs.pmnd.rs/zustand/guides/practice-with-no-store-actions
`
function RenderCount() {
  const renders = React.useRef(0)
  return <Badge count={++renders.current} showZero />
}

const barStoreSchema = z.object({
  bears: z.number(),
  increasePopulation: z.function().optional(),
  decreasePopulation: z.function().optional(),
})

type TBearStore = z.infer<typeof barStoreSchema>

const initialState: TBearStore = {
  bears: 0,
}

const useBearStore = createSelectors(
  create<TBearStore>()(
    devtools(
      persist(() => initialState, { name: 'case11-bearStore' }),
      { name: 'case11-bearStore' },
    ),
  ),
)

function increasePopulation() {
  useBearStore.setState(state => ({ bears: state.bears + 1 }))
}
function decreasePopulation() {
  useBearStore.setState(state => ({ bears: state.bears - 1 }))
}

function Actions() {
  // const increasePopulation = useBearStore.use.increasePopulation();
  // const decreasePopulation = useBearStore.use.decreasePopulation();

  // 新增
  const addTenBears = React.useCallback(() => {
    useBearStore.setState(state => ({ bears: state.bears + 10 }))
  }, [])

  return (
    <Card title="Actions" extra={<RenderCount />}>
      <Button onClick={increasePopulation}>+1</Button>
      <Button onClick={decreasePopulation}>-1</Button>
      <Button onClick={addTenBears}>+10</Button>
    </Card>
  )
}

function Index() {
  const bears = useBearStore(state => state.bears) // reactive

  // const bears = useBearStore.getState().bears; // no-reactive

  return (
    <>
      <pre>{topicDesc}</pre>
      <h3>{bears}</h3>
      <Actions />
      <Button
        onClick={() => {
          globalThis.console.log('useBearStore.getState()', useBearStore.getState().bears)
        }}
      >
        Manual Get State
      </Button>
    </>
  )
}

export default Index
