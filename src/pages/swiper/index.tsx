import React from 'react'
import { Divider } from 'antd'
import Swiper from './Swiper'
import Carousel from './Carousel'

function SwiperDemo() {
  return (
    <>
      <Swiper />
      <Divider />
      <Carousel />
    </>
  )
}

SwiperDemo.displayName = 'SwiperDemo'

export default SwiperDemo
