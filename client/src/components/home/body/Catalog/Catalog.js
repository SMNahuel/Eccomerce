import React from 'react';
import './Catalog.css';
import ProductCard from './ProductCard/ProductCard';

// import Swiper core and required components
import SwiperCore, {Pagination, EffectCoverflow, Autoplay} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle.min.css';

// install Swiper components
SwiperCore.use([Pagination, EffectCoverflow, Autoplay]);


export default function Catalog({products, handleDetail}) {
    return(
        <Swiper
            effect="coverflow"
            loop={true}
            centeredSlides={true}
            coverflowEffect={{ rotate: 30, stretch: 100, slideShadows: false }}
            autoplay={{ delay: 2000 }}
            breakpoints={{
                0:  { slidesPerView: 1 },
                600:  { slidesPerView: 2 },
                1000:  { slidesPerView: 3 },
                1500:  { slidesPerView: 4 }
            }}
        >
            {products && 
                products.map(product => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} onDetail={handleDetail}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}
