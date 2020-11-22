import React, { useEffect, useState } from 'react';
import s from './CarouselB.module.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ImgComponent from './imgComponent/ImgComponent';
import banner1 from '../../../../img/banner1.jpg'
import banner2 from '../../../../img/banner2.jpg'
import banner3 from '../../../../img/banner3.jpg'
import banner4 from '../../../../img/banner4.jpg'
import banner5 from '../../../../img/banner5.jpg'
import banner6 from '../../../../img/banner6.jpg'
import banner7 from '../../../../img/banner7.png'

export default function CarouselB(){
    const array = [
        <ImgComponent src={banner1}/>,
        <ImgComponent src={banner2}/>,
        <ImgComponent src={banner3}/>,
        <ImgComponent src={banner4}/>,
        <ImgComponent src={banner5}/>,
        <ImgComponent src={banner6}/>,
        <ImgComponent src={banner7}/>,
    ]
    const [ x, setX ] = useState(0)
    const goLeft = () =>{
        setX(x + 100)
        x === 0 ? setX(-100 * (array.length - 1)) : setX(x + 100)
    }
    const goRight = () =>{
        x === -100 * (array.length -1) ? setX(0) : setX(x - 100)
    }
    useEffect(()=>{
        const timeoutId = setTimeout(goRight, 5000)
        return () => clearTimeout(timeoutId)
    }, [x])
    return (
        <div className={s.container_main}>
            {
                array.map((item, index) => {
                    return (
                        <div key={index} className={s.container_img}
                            style={{ transform: `translateX(${x}%)` }}>
                            {item}
                        </div>
                    )
                })
            }
            <button
                id="goLeft"
                onClick={goLeft}
                className={s.button_left}>
                <ArrowBackIcon />
            </button>
            <button
                id="goRight"
                onClick={goRight}
                className={s.button_right}>
                <ArrowForwardIcon />
            </button>
        </div>
    )
}