import React, { useRef } from 'react';
import s from './Product.module.css';
import imgNotFound from '../../../img/img404.jpg';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({product, onBack}) => {

  const image = product.images[0] ?
  `${process.env.REACT_APP_API_URL}${product.images[0].url}`:
  imgNotFound

  const ref = useRef(null)
  const onUnmount = () => {
    ref.current.style.animation = s.containerUnmount + ' 450ms linear'
    setTimeout(onBack, 400);
  };

  return (
    <div className={s.container} ref={ref}>
      <ArrowBackIcon className={s.back} onClick={onUnmount} />
      <div className={s.container_main}>
        <div className={s.container_flex}>
          <div className={s.card} style={{ backgroundImage: `url(${image})` }}>
          </div>
          <div className={s.container_title_price_stock_ranking}>
            <div className={s.container_title}>
              <h1 className={s.name} >{product.name}</h1>
            </div>
            <p>Author: Lorem impsum</p>
            <p>Cupo: {product.stock}</p>
            <p>Precio: {product.price}$</p>
            <p>Reviews: ★★★★☆</p>
          </div>
          <div className={s.container_description}>
            <p>Description:</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div className={s.container_button}>
          <button >Add to Cart</button>
        </div>
      </div> 
    </div>
  )
}