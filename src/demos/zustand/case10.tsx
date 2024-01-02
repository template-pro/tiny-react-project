import { Badge, Button, Card } from 'antd'
import * as React from 'react'
import { z } from 'zod'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import createSelectors from './_utils/createSelectors'

// const immer = (args) => args;

const topicDesc = `
  1. store 外部用

  2? getState 的场景：前面的 subscribe 订阅初始化问题，可以用 getState 解决
`
function RenderCount() {
  const renders = React.useRef(0)
  return <Badge count={++renders.current} showZero />
}

const barStoreSchema = z.object({
  bears: z.number(),
  increasePopulation: z.function(),
  decreasePopulation: z.function(),
})

type TBearStore = z.infer<typeof barStoreSchema>

const useBearStore = createSelectors(
  create<TBearStore>()(
    devtools(
      persist(
        set => ({
          bears: 0,
          increasePopulation: () =>
            set(state => ({ bears: state.bears + 1 })),
          decreasePopulation: () =>
            set(state => ({ bears: state.bears - 1 })),
        }),
        {
          name: 'case10-bearStore',
        },
      ),
      {
        name: 'case10-bearStore',
      },
    ),
  ),
)

function Actions() {
  const increasePopulation = useBearStore.use.increasePopulation()
  const decreasePopulation = useBearStore.use.decreasePopulation()

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
