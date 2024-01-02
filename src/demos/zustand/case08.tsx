import { Badge, Button, Card } from 'antd'
import * as React from 'react'
import { z } from 'zod'
import { create } from 'zustand'
import createSelectors from './_utils/createSelectors'

// const immer = (args) => args;

const topicDesc = `
  1. 01 的例子中，发布订阅的方式，当状态发生变化时，所有订阅的组件都会重新渲染
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
  create<TBearStore>()(set => ({
    bears: 0,
    increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
    decreasePopulation: () => set(state => ({ bears: state.bears - 1 })),
  })),
)

/**
 * 不用发布订阅的方式
 */
function NoSubChild() {
  const bears = useBearStore(state => state.bears)
  const isLessThanTen = bears < 10

  return (
    <Card title="不是发布订阅" extra={<RenderCount />}>
      <h1 style={{ color: isLessThanTen ? 'red' : 'green' }}>
        不用发布订阅的方式
      </h1>
    </Card>
  )
}

/**
 *  使用发布订阅的方式
 */
function UseSubChild() {
  // const bears = useBearStore((state) => state.bears);
  // const isLessThanTen = bears < 10;
  const [isLessThanTen, setLessThanTen] = React.useState(false)

  React.useEffect(() => {
    const unsubscribe = useBearStore.subscribe((state) => {
      setLessThanTen(state.bears < 10)
    })

    return unsubscribe
  }, [])

  return (
    <Card title="发布订阅" extra={<RenderCount />}>
      <h1 style={{ color: isLessThanTen ? 'red' : 'green' }}>发布订阅</h1>
    </Card>
  )
}

// eslint-disable-next-line unused-imports/no-unused-vars
const MemoizedUseSubChild = React.memo(UseSubChild)

function Actions() {
  const increasePopulation = useBearStore.use.increasePopulation()
  const decreasePopulation = useBearStore.use.decreasePopulation()

  return (
    <Card title="Actions" extra={<RenderCount />}>
      <Button onClick={increasePopulation}>+1</Button>
      <Button onClick={decreasePopulation}>-1</Button>
    </Card>
  )
}

function Index() {
  const bears = useBearStore(state => state.bears)

  return (
    <>
      <pre>{topicDesc}</pre>
      <h3>{bears}</h3>
      <Actions />
      <NoSubChild />
      <UseSubChild />
      {/* <MemoizedUseSubChild /> */}
    </>
  )
}

export default Index
