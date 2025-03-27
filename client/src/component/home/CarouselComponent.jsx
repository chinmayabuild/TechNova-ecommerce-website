import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import carousel1 from "../../../assets/p1.png";
import carousel2 from "../../../assets/p2.png";
import carousel3 from "../../../assets/p2.png";
import ProductCarousel from './ProductCarousel';

const products = [
  { model: "242", price: 86, image: carousel1 },
  { model: "243", price: 92, image: carousel2 },
  { model: "244", price: 99, image: carousel3 }
];

const CarouselComponent = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Swiper
        navigation
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="pb-6"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <ProductCarousel {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselComponent;