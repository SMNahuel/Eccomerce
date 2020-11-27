import React, { useEffect, useRef, useState } from 'react';
import s from './Product.module.css';
import imgNotFound from '../../../../../img/img404.jpg';
import CloseIcon from '@material-ui/icons/Close';
import api from '../../../../../redux/action-creators';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import ReviewsBox from './ReviewsBox/ReviewsBox';
import toStars from '../../../../../utils/toStars';
import CommentsBox from './CommentsBox/CommentsBox';

export default ({product, onBack}) => {
  const reviews = useSelector(state => state.reviews)
  const image = product.images[0] ?
    `${process.env.REACT_APP_API_URL}${product.images[0].url}` :
    imgNotFound

  const dispatch = useDispatch()
  const [state, setState] = useState({
    average: 0,
    averageStars: "",
    stars: [0, 0, 0, 0, 0],
    reviews: reviews,
  })

  const availableQuantities = (function () {
    let ret = [];
    for (let i = 1; i <= product.stock; i++) {
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
  useEffect(() => {
    if (reviews.length) {
      let average = 0
      let stars = [0, 0, 0, 0, 0]
      reviews.forEach(review => {
        average += review.qualification
        stars[review.qualification - 1]++
      })
      average = (average / reviews.length).toFixed(1)
      let averageStars = toStars(average)
      setState(state => ({ ...state, average, averageStars, stars, reviews }))
    }
  }, [reviews])
  return (
    <div className={s.container} ref={ref}>
      <div className={s.container_main}>
        <div className={s.container_button_close} onClick={onUnmount}>
          <CloseIcon className={s.back} fontSize="default" />
        </div>
        <div className={s.container_flex}>
          <div className={s.container_img_title_flex}>
            <div className={s.container_background} style={{ backgroundImage: `url(${image})` }}>
            </div>
            <div className={s.container_about_product}>
              <div className={s.container_title}>
                <h1 className={s.name} >{product.name}</h1>
              </div>
              <div>
                <p>Author: Lorem impsum</p>
                <p className={s.p_reviews}>{state.averageStars}</p>
              </div>
              <p className={s.p_price}>${product.price}</p>
              <div className={s.container_stock_select}>
                <div>
                  <p><b>Available stock</b></p>
                </div>
                <div className={s.container_select_p_flex}>
                  <div>
                    <label>Quantity: </label>
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
                  <p className={s.p_stock_available}>({product.stock} available)</p>
                </div>
              </div>
              <div className={s.container_button}>
                <button onClick={onAddToCart}>Add to Cart</button>
              </div>
            </div>
          </div>
          {/* no borrar el div empty */}
          <div className={s.container_empty}></div>
          <div className={s.container_description}>
            <h3>What you'll learn</h3>
            <div className={s.container_description_product}>
              <ReactMarkdown>{product.description}</ReactMarkdown>
            </div>
          </div>
          <div className={s.container_review}>
            <h3>Product reviews</h3>
            <div className={s.container_description_review}>
              <ReviewsBox productId={product.id} />
            </div>
          </div>
          <CommentsBox productId={product.id} />
        </div>
      </div>
    </div>
  )
}