import React from 'react'
import { Divider } from 'antd'
import Swiper from './Swiper'
import Carousel from './Carousel'

const SwiperDemo: React.FC = () => {
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
