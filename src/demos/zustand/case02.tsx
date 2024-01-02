import { Badge, Button, Card, Space } from 'antd'
import * as React from 'react'
import { z } from 'zod'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// const immer = (args) => args;

const topicDesc = `
  1. immer middleware
  2. 优化性能
  3. 优化代码
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
})

type TCatStore = z.infer<typeof catStoreSchema>

const useCatStore = create<TCatStore>()(
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
  const { increaseBigCats, increaseSmallCats } = useCatStore(state => ({
    increaseBigCats: state.increaseBigCats,
    increaseSmallCats: state.increaseSmallCats,
  }))
  return (
    <Space>
      <Button onClick={increaseBigCats}>increaseBigCats</Button>
      <Button onClick={increaseSmallCats}>increaseSmallCats</Button>
    </Space>
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