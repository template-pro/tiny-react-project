import { Badge, Button, Card } from 'antd'
import * as React from 'react'
import { z } from 'zod'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import createSelectors from './_utils/createSelectors'

// const immer = (args) => args;

const topicDesc = `
  1. 接上一个列子，subscribe 可以订阅全部状态，使用 subscribeWithSelector 可以订阅部分状态

  2 顺序 create immer devtools subscribeWithSelector persist
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
    subscribeWithSelector(set => ({
      bears: 0,
      increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
      decreasePopulation: () => set(state => ({ bears: state.bears - 1 })),
    })),
  ),
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
    const unsubscribe = useBearStore.subscribe(
      state => state.bears,
      (bears) => {
        setLessThanTen(bears < 10)
      },
      {
        // equalityFn: shallow, // 前面例子提到过
        fireImmediately: true, // 默认为 false，即默认不会立即执行
      },
    )

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
