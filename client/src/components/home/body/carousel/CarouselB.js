import React, { useEffect, useState } from 'react';
import s from './CarouselB.module.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ImgComponent from './imgComponent/ImgComponent';
import CourseAngular from '../../../../img/CourseAngular.jpg';
import HtmlJsCss from '../../../../img/HtmlJsCss.jpg';
import Java from '../../../../img/Java.jpg';
import Python from '../../../../img/Python.jpg';
import React2 from '../../../../img/React.jpg';
import ReactRedux from '../../../../img/ReactRedux.jpg';

export default function CarouselB(){
    const array = [
        <ImgComponent src={ReactRedux}/>,
        <ImgComponent src={React2}/>,
        <ImgComponent src={CourseAngular}/>,
        <ImgComponent src={HtmlJsCss}/>,
        <ImgComponent src={Java}/>,
        <ImgComponent src={Python}/>,
        <ImgComponent src={ReactRedux}/>,
        <ImgComponent src={React2}/>,
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
        const timeoutId = setTimeout(goRight, 4000)
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