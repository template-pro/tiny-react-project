import React from 'react'
import { Button, Carousel, Row } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import type { CarouselRef } from 'antd/lib/carousel'
import { randomHexColorCode } from '@wuxh/utils'

function contentStyle(): React.CSSProperties {
  return {
    height: '300px',
    color: randomHexColorCode(),
    backgroundColor: randomHexColorCode(),
    lineHeight: '300px',
    textAlign: 'center',
  }
}

const MyCarousel = React.createContext<CarouselRef | null>(null)

function CarouselButton() {
  const carousel = React.useContext(MyCarousel)
  return (
    <Row justify="space-between">
      <Button icon={<LeftOutlined />} onClick={() => carousel?.prev()}>prev</Button>
      <Button icon={<RightOutlined />} onClick={() => carousel?.next()}>next</Button>
    </Row>
  )
}

function CarouselDemo() {
  const [carousel, setCarousel] = React.useState<CarouselRef | null>(null)
  const ref = React.useCallback(el => setCarousel(el), [])

  return (
    <>
      <MyCarousel.Provider value={carousel}>
        <Carousel autoplay ref={ref}>
          {
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index}>
                <h3 style={contentStyle()}>{index + 1}</h3>
              </div>
            ))
          }
        </Carousel>
        <CarouselButton />
      </MyCarousel.Provider>
    </>
  )
}

CarouselDemo.displayName = 'CarouselDemo'

export default CarouselDemo
