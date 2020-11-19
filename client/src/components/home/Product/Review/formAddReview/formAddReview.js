import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import api from '../../../../../redux/action-creators'
import s from './formAddReview.module.css'

export default function FormAddReview({setAddReview, productId}){
    const [review, setReview] = useState({
        message:"",
        qualification: 0
    })

    const dispatch = useDispatch()

    const finishReview = () => {
        dispatch(api.addReview(productId, review))
        setAddReview()
    }
    const setStars= (num) => {
        setReview({
            ...review,
            qualification: num
        })
    }
    const onChange = e => {
        setReview({
            ...review,
            message: e.target.value
        })
    }

    return(
        <div>
            <p className={s.clasification}>
                <input type="radio" className={s.radio}/>
                <label className={s.star} onClick={() => setStars(5)}>★</label>
                <input type="radio" className={s.radio}/>
                <label className={s.star} onClick={() => setStars(4)}>★</label>
                <input type="radio" className={s.radio}/>
                <label className={s.star} onClick={() => setStars(3)}>★</label>
                <input type="radio" className={s.radio}/>
                <label className={s.star} onClick={() => setStars(2)}>★</label>
                <input type="radio" className={s.radio}/>
                <label className={s.star} onClick={() => setStars(1)}>★</label>
            </p>
            <label>message: </label>
            <textarea value={review.message} onChange={onChange} placeholder="message for review..."/>
            <button onClick={() => finishReview()}>Send Review</button>
        </div>
    )
}