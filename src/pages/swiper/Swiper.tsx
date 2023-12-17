import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Button, Row } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { randomHexColorCode } from '@wuxh/utils'

import 'swiper/css'

function SwiperButton() {
  const swiper = useSwiper()

  return (
    <Row justify="space-between">
      <Button icon={<LeftOutlined />} onClick={() => swiper.slidePrev()}>prev</Button>
      <Button icon={<RightOutlined />} onClick={() => swiper.slideNext()}>next</Button>
    </Row>
  )
}

function SwiperDemo() {
  return (
    <>
      <Swiper
        loop
        autoplay
        onSlideChange={swiper => window.console.log('slide change', swiper)}
        onSwiper={swiper => window.console.log(swiper)}
        height={300}
      >
        {
          Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide
              key={index}
              style={{ backgroundColor: randomHexColorCode(), height: '300px' }}
            >
              Slide
              {' '}
              {index + 1}
            </SwiperSlide>
          ))
        }
        <SwiperButton />
      </Swiper>
    </>
  )
}

SwiperDemo.displayName = 'SwiperDemo'

export default SwiperDemo
