import { Badge, Button, Card, Space } from 'antd'
import * as React from 'react'
import { z } from 'zod'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'

import createSelectors from './_utils/createSelectors'

// const immer = (args) => args;

const topicDesc = `
  1. 接上一个例子！ 不使用 auto create selector。添加了一个 shallow 操作
  shallow 操作可以避免重复渲染, 但是只能响应一层 , 如果需要响应多层，可以自己考虑实现
`

function RenderCount() {
  const renders = React.useRef(0)
  return <Badge count={++renders.current} showZero />
}

const catStoreSchema = z.object({
  cats: z.object({
    bigCats: z.number(),
    smallCats: z.number(),
  }),
  increaseBigCats: z.function().args(),
  increaseSmallCats: z.function(),
  summary: z.function().returns(z.number()),
})

type TCatStore = z.infer<typeof catStoreSchema>

const useCatStore = createSelectors(
  create<TCatStore>()(
    immer(set => ({
      cats: {
        bigCats: 0,
        smallCats: 0,
      },
      increaseBigCats: () => {
        set((state) => {
          state.cats.bigCats++
        })
      },
      increaseSmallCats: () => {
        set((state) => {
          state.cats.smallCats++
        })
      },
    })),
  ),
)

function Child() {
  const cats = useCatStore(state => state.cats)
  return (
    <Card>
      <RenderCount />
      <h3>
        Small:
        {cats.smallCats}
      </h3>
      <h3>
        Big:
        {cats.bigCats}
      </h3>
    </Card>
  )
}

function SmallChild() {
  const smallCats = useCatStore(state => state.cats.smallCats)

  // auto create selector 只能响应一层，比如这里的 cats.smallCats 就不行
  // const smallCats = useCatStore.use.cats().smallCats;

  return (
    <Card title="Small" extra={<RenderCount />}>
      <span>{smallCats}</span>
    </Card>
  )
}

function BigChild() {
  const bigCats = useCatStore(state => state.cats.bigCats)
  return (
    <Card title="Big" extra={<RenderCount />}>
      <span>{bigCats}</span>
    </Card>
  )
}

function Actions() {
  const { increaseBigCats, increaseSmallCats } = useCatStore(
    state => ({
      increaseBigCats: state.increaseBigCats,
      increaseSmallCats: state.increaseSmallCats,
    }),
    shallow,
  )

  return (
    <Card title="Actions" extra={<RenderCount />}>
      <Space>
        <Button onClick={increaseBigCats}>increaseBigCats</Button>
        <Button onClick={increaseSmallCats}>increaseSmallCats</Button>
      </Space>
    </Card>
  )
}

function App() {
  return (
    <>
      <pre>{topicDesc}</pre>
      <Child />
      <SmallChild />
      <BigChild />
      <br />
      <Actions />
    </>
  )
}

export default App