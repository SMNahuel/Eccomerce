import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import s from './Carousel.module.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ImgComponent from './imgComponent/ImgComponent';

export default function CarouselB(){
    const product = useSelector(state => state.products)
    const arrayurl = []
    const arraynames= []
    const arraydescription = []
    const arrayprice = []
    const arraystock = []
    product.map(products =>{
        arrayurl.push(`${process.env.REACT_APP_API_URL}${products.images[0].url}`)
        arraynames.push(products.name)
        arraydescription.push(products.description)
        arrayprice.push(products.price)
        arraystock.push(products.stock)
    })
    const array = [
        <ImgComponent src={arrayurl[0]} name={arraynames[0]} description={arraydescription[0]} price={arrayprice[0]} stock={arraystock[0]}/>,
        <ImgComponent src={arrayurl[6]} name={arraynames[6]} description={arraydescription[6]} price={arrayprice[6]} stock={arraystock[6]}/>,
        <ImgComponent src={arrayurl[11]} name={arraynames[11]} description={arraydescription[11]} price={arrayprice[11]} stock={arraystock[11]}/>,
        <ImgComponent src={arrayurl[17]} name={arraynames[17]} description={arraydescription[17]} price={arrayprice[17]} stock={arraystock[17]}/>,
        <ImgComponent src={arrayurl[24]} name={arraynames[24]} description={arraydescription[24]} price={arrayprice[24]} stock={arraystock[24]}/>,
        <ImgComponent src={arrayurl[30]} name={arraynames[30]} description={arraydescription[30]} price={arrayprice[30]} stock={arraystock[30]}/>,
        <ImgComponent src={arrayurl[36]} name={arraynames[36]} description={arraydescription[36]} price={arrayprice[36]} stock={arraystock[36]}/>,
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
        const timeoutId = setTimeout(()=>{
            x === -100 * (array.length -1) ? setX(0) : setX(x - 100)
        }, 5000)
        return () => clearTimeout(timeoutId)
    }, [x, array.length])
    return (
        <div className={s.container_main}>
            {
                array.map((item, index) => (
                    <div key={index} className={s.container_img}
                        style={{ transform: `translateX(${x}%)` }}>
                        {item}
                    </div>
                ))
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