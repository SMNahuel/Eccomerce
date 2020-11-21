import React, { useState } from 'react';
import s from './Review.module.css'
import { useDispatch } from 'react-redux';
import api from '../../../../../../../redux/action-creators'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import toStars from '../../../../../../../utils/toStars';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Review({ review, del }){
    const [state, setState] = useState({
        like: 0,
        dislike: 0
    })
    const onLike = e => {
        e.preventDefault();
        setState({...state, like: state.like + 1})
    }
    const onDislike = e => {
        e.preventDefault();
        setState({...state, like: state.dislike + 1})
    }
    const dispatch = useDispatch()
    const onDeleteReview = e => {
        e.preventDefault();
        dispatch(api.deleteReview(review.productId, review.userId))
    }

    return (
        <div className={s.container_main}>
            <div>
                <p className={s.p_reviews}>{toStars(review.qualification)}</p>
            </div>
            <h2 className={s.h2_title}>{review.user.name}</h2>
            <p className={s.p_description}>{review.message}</p>
            <div className={s.container_hands_up_down}>
                <div className={s.container_up_down}>
                    <button onClick={onLike}>
                        <ThumbUpAltOutlinedIcon fontSize="small"/>
                    </button>
                    <label>{state.like}</label>
                </div>
                <div className={s.container_up_down_2}>
                    <button onClick={onDislike}>
                        <ThumbDownAltOutlinedIcon fontSize="small"/>
                    </button>
                    <label>{state.dislike}</label>
                </div>
                {del && 
                    <div className={s.container_delete}>
                        <button onClick={onDeleteReview}>
                            <DeleteIcon />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}