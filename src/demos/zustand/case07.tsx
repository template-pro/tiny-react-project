import { Badge, Button, Card, Space } from 'antd'
import * as React from 'react'
import { z } from 'zod'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'

import createSelectors from './_utils/createSelectors'

// const immer = (args) => args;

const topicDesc = `
  1. 接上一个例子，添加 persist 将状态持久化到 localStorage
  你可以在 localStorage 中搜索 catStore，看看它的值
  2. 清除 storage
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
  color: z.string().optional(),
})

type TCatStore = z.infer<typeof catStoreSchema>

const useCatStore = createSelectors(
  create<TCatStore>()(
    immer(
      devtools(
        persist(
          set => ({
            color: 'red',
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
          }),
          {
            name: 'catStore',
            // storage: createJSONStorage(() => sessionStorage), // 默认是 localStorage 可以自定义（后面会讲到）
            // 可以保存部分状态 // https://docs.pmnd.rs/zustand/integrations/persisting-store-data#partialize
            partialize: state =>
              Object.fromEntries(
                Object.entries(state).filter(
                  ([key]) => !['color'].includes(key),
                ),
              ),
          },
        ),
        {
          enabled: true,
          name: 'catStore',
        },
      ),
    ),
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

function ClearStorage() {
  function clearStorage() {
    useCatStore.persist.clearStorage() // 注意这里 没有清除 memory！！！
  }
  return (
    <Button danger onClick={clearStorage}>
      ClearStorage
    </Button>
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
      <hr />
      <ClearStorage />
    </>
  )
}

export default App
