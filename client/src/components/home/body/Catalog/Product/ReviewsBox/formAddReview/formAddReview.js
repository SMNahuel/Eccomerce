import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import api from '../../../../../../../redux/action-creators'
import s from './formAddReview.module.css'
import CloseIcon from '@material-ui/icons/Close';

export default function FormAddReview({ onBack, review, productId }){
    const dispatch = useDispatch()
    const [input, setInput] = useState(review || {qualification:3, message:""})
    const setStars = val => {
        setInput({...input, qualification: val})
    }
    const onChangeMessage = e => {
        setInput({...input, message: e.target.value})
    }
    const onSubmit = e => {
        e.preventDefault()
        dispatch(api.makeReview(productId, input))
        onBack()
    }
    return(
        <div className={s.FormReview}>
            <div className={s.container_closeIcon}>
                <CloseIcon className={s.close} onClick={() => onBack()}/>
            </div>
            <div className={s.container_p_clasification}>

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
            <div className={s.message}>
                <label>message: </label>
                <textarea 
                value={input.message} 
                onChange={onChangeMessage} 
                placeholder="message for review..."
                autoFocus="true"/>
            </div>
            <div className={s.container_button_submit}>
                <button onClick={onSubmit}>Send Review</button>
            </div>
        </div>
    )
}