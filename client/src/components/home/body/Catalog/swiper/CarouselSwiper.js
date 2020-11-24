import React from 'react';
import 'swiper/swiper-bundle.min.css';
import './CarouselSwiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Pagination, Navigation} from 'swiper';
import ProductCard from '../ProductCard/ProductCard.js';
SwiperCore.use([Pagination, Navigation]);

export default function CarouselSwiper({products, onDetail}){
    return(
        <Swiper
            navigation
            pagination={{ clickable: true }}
            centeredSlides={true}
            breakpoints={{
                0: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                1000: { slidesPerView: 3 },
                1500: { slidesPerView: 4 }
            }}
        >
            {products &&
                products.map(product => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} onDetail={onDetail} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}