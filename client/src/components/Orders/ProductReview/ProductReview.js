import React, { useRef, useState } from 'react';
import s from './ProductReview.module.css'
import { useDispatch } from 'react-redux';
import api from '../../../redux/action-creators';
import imgNotFound from '../../../img/img404.jpg';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function ProductReview({ onBack, product }){
    const dispatch = useDispatch()
    const [input, setInput] = useState(product.reviews[0] || {qualification:3, message:""})
    const setStars = val => {
        setInput({...input, qualification: val})
    }
    const onChangeMessage = e => {
        setInput({...input, message: e.target.value})
    }
    const onSubmit = e => {
        e.preventDefault()
        dispatch(api.makeReview(product.id, input))
        onUnmount()
    }
    const image = product.images[0].url ?
    `${process.env.REACT_APP_API_URL}${product.images[0].url}` :
    imgNotFound
    const ref = useRef(null)
    const onUnmount = () => {
        ref.current.style.animation = s.containerUnmount + ' 450ms linear'
        setTimeout(onBack, 400);
    };
    return (
        <div className={s.container} ref={ref}>
            <div className={s.container_main}>
                <HighlightOffIcon className={s.back} fontSize="large" onClick={onUnmount}/>
                    <h1>{product.name}</h1>
                    <div className={s.container_img_title_flex}>
                        <div className={s.container_background} style={{ backgroundImage: `url(${image})` }}>
                        </div>
                        <div className={s.container_about_product}>
                            <div className={s.container_stars}>
                                <p>How many stars would you give it?</p>
                                <p className={s.clasification}>
                                    <input type="radio" className={s.radio} checked={input.qualification > 4} />
                                    <label className={s.star} onClick={() => setStars(5)}>★</label>
                                    <input type="radio" className={s.radio} checked={input.qualification > 3}/>
                                    <label className={s.star} onClick={() => setStars(4)}>★</label>
                                    <input type="radio" className={s.radio} checked={input.qualification > 2}/>
                                    <label className={s.star} onClick={() => setStars(3)}>★</label>
                                    <input type="radio" className={s.radio} checked={input.qualification > 1}/>
                                    <label className={s.star} onClick={() => setStars(2)}>★</label>
                                    <input type="radio" className={s.radio} checked={input.qualification > 0}/>
                                    <label className={s.star} onClick={() => setStars(1)}>★</label>
                                    : stars
                                </p>
                            </div>
                            <div className={s.container_p_textarea}>
                                <p>Tell us more about the product</p>
                                <textarea onChange={onChangeMessage} value={input.message} placeholder="Write about your experience in this course"/>
                            </div>
                            <div className={s.container_button_feedback}>
                                <button onClick={onSubmit}>Send feedback</button>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}