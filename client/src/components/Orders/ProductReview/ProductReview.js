import React, { useRef } from 'react';
import s from './ProductReview.module.css'
import imgNotFound from '../../../img/img404.jpg';
import StarIcon from '@material-ui/icons/Star';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function ProductReview({ onBack, product }){
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
                                <div>
                                    <button><StarIcon/></button>
                                    <button><StarIcon/></button>
                                    <button><StarIcon/></button>
                                    <button><StarIcon/></button>
                                    <button><StarIcon/></button>
                                </div>
                            </div>
                            <div className={s.container_p_input}>
                                <p>Give your review a title</p>
                                <input placeholder="Title"/>
                            </div>
                            <div className={s.container_p_textarea}>
                                <p>Tell us more about the product</p>
                                <textarea placeholder="Write about your experience in this course"></textarea>
                            </div>
                            <div className={s.container_button_feedback}>
                                <button>Send feedback</button>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}