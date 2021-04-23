import React from 'react';
import { Carousel } from 'antd';
import { FormSider } from '@layouts/sider/styles';
import Image from 'next/image';

const CarouselSelect = () => {
  const hanldeAfter = () => {};
  const hanldeBefore = () => {};
  return (
    <FormSider>
      <Carousel
        style={{ margin: 0 }}
        afterChange={hanldeAfter}
        beforeChange={hanldeBefore}
        autoplay
      >
        <Image
          src="/1.jpg"
          alt="Picture of the author"
          width={500}
          height={1000}
          objectFit="cover"
        />
        <Image
          src="/2.jpg"
          alt="Picture of the author"
          width={500}
          height={1000}
          // layout="fill"
          objectFit="cover"
        />
      </Carousel>
    </FormSider>
  );
};

export default CarouselSelect;
