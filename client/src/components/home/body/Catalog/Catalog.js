import React from 'react';
import './Catalog.css';
import 'swiper/swiper-bundle.min.css';
import ProductCard from './ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectCoverflow, Virtual, Navigation} from 'swiper';
SwiperCore.use([EffectCoverflow, Virtual, Navigation]);

export default function Catalog({products, handleDetail}) {
    return(
        <Swiper
            virtual
            navigation
            effect="coverflow"
            centeredSlides={true}
            coverflowEffect={{ rotate: 30, stretch: 100, slideShadows: false }}
            breakpoints={{
                0:    { slidesPerView: 1 },
                600:  { slidesPerView: 2 },
                1000: { slidesPerView: 3 },
                1500: { slidesPerView: 4 }
            }}
        >
            {products && 
                products.map((product, index) => (
                    <SwiperSlide key={product.id} virtualIndex={index}>
                        <ProductCard product={product} onDetail={handleDetail}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}
