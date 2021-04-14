import React from 'react';
import { CarouselImg } from '@components/forms/register/styles';
import { Carousel } from 'antd';

const CarouselSelect = () => {
  const hanldeAfter = () => {};
  const hanldeBefore = () => {};
  return (
    <Carousel
      style={{ margin: 0 }}
      afterChange={hanldeAfter}
      beforeChange={hanldeBefore}
      autoplay
    >
      <CarouselImg src="" />
      <CarouselImg src="" />
    </Carousel>
  );
};

export default CarouselSelect;
