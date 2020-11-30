import React, { useEffect, useState } from 'react';
import axios from '../../../../utils/axios'
import 'swiper/swiper-bundle.min.css';
import s from './Carousel.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Pagination, Navigation, EffectCoverflow, Autoplay} from 'swiper';
import ImgComponent from './imgComponent/ImgComponent';
SwiperCore.use([Pagination, Navigation, EffectCoverflow, Autoplay]);

export default function Carousel({onDetail}){
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/top`)
        .then(({data}) => setProducts(data))
    }, [])
    // console.log(products);
    return(
        <div className={s.container_swiper}>
            <Swiper
                navigation
                centeredSlides
                loop
                autoplay={{ delay: 5000 }}
                slidesPerView= {1}
                effect={'coverflow'}
                coverflowEffect={{rotate: 30, slideShadows: false}}
                pagination={{ clickable: true }}
                breakpoints={{
                    320: { spaceBetween: -100 },
                    480: { spaceBetween: -300 },
                    640: { spaceBetween: -500 }
                }}
            >
                {products.map(product => (
                        <SwiperSlide key={product.id}>
                            <ImgComponent product={product} onDetail={() => onDetail(product)}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}