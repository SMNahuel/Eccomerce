import React, { useRef } from 'react';
import s from './Product.module.css';
import imgNotFound from '../../../img/img404.jpg';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({product, onBack}) => {
  const image = product.images[0] ?
  `https://${process.env.REACT_APP_API_URL}${product.images[0].url}`:
  imgNotFound

  const ref = useRef(null)
  const onUnmount = () => {
    ref.current.style.animation = s.containerUnmount + ' 450ms linear'
    setTimeout(onBack, 400);
  };

  return (
    <div className={s.container} ref={ref}>
      <div className={s.card} style={{backgroundImage:`url(${image})`}}>
        <ArrowBackIcon className={s.back} onClick={onUnmount} />
        <div className={s.info} >
          <h1 className={s.name} >{product.name}</h1>
          <h4 className={s.price} >Precio: {product.price}</h4>
          <h4 className={s.stock} >Cupo: {product.stock}</h4>
          <div className={s.description}>
            <h1>Descipcion:</h1>
            <h2>{product.description}</h2>
          </div>
          <h3 className={s.ranking}>Reviews: ★★★★☆</h3>
        </div>
      </div>
    </div>
  )
}
