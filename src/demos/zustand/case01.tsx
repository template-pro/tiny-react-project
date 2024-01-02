import { Button, Space, Typography } from 'antd'
import { z } from 'zod'
import { create } from 'zustand'

const topicDesc = `
  1. zustand + zod
  2. 起步 demo
`

const barStoreSchema = z.object({
  bears: z.number(),
  increasePopulation: z.function(),
  removeAllBears: z.function().returns(z.boolean()).optional(),
})

type TBearStore = z.infer<typeof barStoreSchema>

const useBearStore = create<TBearStore>()(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => {
    set({ bears: 0 })
    return true
  },
}))

function Child() {
  const increasePopulation = useBearStore(state => state.increasePopulation)
  const bears = useBearStore(state => state.bears)
  return (
    <Button type="primary" onClick={increasePopulation}>
      increasePopulation(
      {bears}
      )
    </Button>
  )
}

function SubChild() {
  const removeAllBears = useBearStore(state => state.removeAllBears)
  const bears = useBearStore(state => state.bears)

  return (
    <Button danger onClick={removeAllBears} disabled={bears <= 0}>
      removeAllBears
    </Button>
  )
}

function Index() {
  const bears = useBearStore(state => state.bears)

  return (
    <>
      <pre>{topicDesc}</pre>
      <Typography.Title>{bears}</Typography.Title>
      <Space>
        <Child />
        <SubChild />
      </Space>
    </>
  )
}

export default Index
