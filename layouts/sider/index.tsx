import React from 'react';
import { Carousel } from 'antd';

const CarouselSelect = () => {
  const hanldeAfter = () => { };
  const hanldeBefore = () => { };
  return (
    <Carousel
      style={{ margin: 0 }}
      afterChange={hanldeAfter}
      beforeChange={hanldeBefore}
      autoplay
    />
  );
};

export default CarouselSelect;
