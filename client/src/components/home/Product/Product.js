import React, { useRef } from 'react';
import s from './Product.module.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({product, onBack}) => {
  const image = `http://${window.location.hostname}:3001${product.images[0].url}`;

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
