import React, { useRef, useState } from 'react';
import s from './Product.module.css';
import imgNotFound from '../../../img/img404.jpg';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import api from '../../../redux/action-creators';
import { useDispatch } from 'react-redux';

export default ({product, onBack}) => {
  const image = product.images[0] ?
  `${process.env.REACT_APP_API_URL}${product.images[0].url}`:
  imgNotFound

  const dispatch = useDispatch()
  
  const availableQuantities = (function () {
    let ret = [];
    for (let i = 1; i <= product.stock; i++){
      ret.push(i);
    };
    return ret;
  })()
  const [quantity, setQuantity] = useState(1)
  const onSelectQuantity = e => setQuantity(e.target.value)
  const onAddToCart = e => {
    dispatch(api.addProduct(product.id, quantity))
    onUnmount()
  }

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
            <div className={s.container_label_select}>
              <label>Stock:</label>
              <select
                className={s.container_select}
                onChange={onSelectQuantity}
                value={quantity}>
                {
                  availableQuantities.map(value =>
                    <option key={value}>{value}</option>
                  )
                }
              </select>
            </div>
            <p>Price: ${product.price}</p>
            <p>Reviews: ★★★★☆</p>
          </div>
          <div className={s.container_description}>
            <p>Description:</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div className={s.container_button}>
          <button onClick={onAddToCart}>Add to Cart</button>

        </div>
      </div>
    </div>
  )
}