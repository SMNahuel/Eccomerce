import React, { useState, useEffect } from 'react';
import s from './ReviewsBox.module.css'
import Review from './Review/Review';
import FormAddReview from './formAddReview/formAddReview'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../../../redux/action-creators'
import toStars from '../../../../../../utils/toStars';

export default function ReviewsBox({productId}) {
    const user = useSelector(state => state.user)
    const purchased = useSelector(state => state.purchased)
    const reviews = useSelector(state => state.reviews)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(api.getReviews(productId))
    }, [dispatch, productId])

    const [state, setState] = useState({
        average: 0,
        averageStars:"",
        stars: [0,0,0,0,0],
        reviews: reviews,
        purchased: purchased.includes(productId),
        addReview: false
    })
    useEffect(()=>{
        if (reviews.length) {
            let average = 0
            let stars = [0,0,0,0,0]
            reviews.forEach(review => {
                average += review.qualification
                stars[review.qualification - 1]++
            })
            average = (average / reviews.length).toFixed(1)
            let averageStars = toStars(average)
            setState(state => ({ ...state, average, averageStars, stars, reviews }))
        }
    }, [reviews])
    const onFilter = (type) => {
        if (type === "positive") {
            setState({
                ...state,
                reviews: reviews.filter(review => review.qualification > 2)
            })
        } else if (type === "negative") {
            setState({
                ...state,
                reviews: reviews.filter(review => review.qualification < 4)
            })
        } else {
            setState({
                ...state,
                reviews: reviews
            })
        }
    }
    const onAddReview = () => setState({...state, addReview: true})
    const onBack = () => setState({...state, addReview: false})
    return (
        <div className={s.container_review_main}>
            <div className={s.container_review_average}>
                <div className={s.container_average}>
                    <p className={s.p_number_average}>{state.average}</p>
                    <p className={s.p_stars}>{state.averageStars}</p>
                    <p className={s.p_text}>Average based on {reviews.length} reviews</p>
                </div>
                <div className={s.container_progress}>
                    <div className={s.container_label_progress}>
                        <label>5 stars</label>
                        <progress max={reviews.length} value={state.stars[4]}>5 stars</progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>4 stars</label>
                        <progress max={reviews.length} value={state.stars[3]}>4 stars</progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>3 stars</label>
                        <progress max={reviews.length} value={state.stars[2]}>3 stars</progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>2 stars</label>
                        <progress max={reviews.length} value={state.stars[1]}>2 stars</progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>1 stars</label>
                        <progress max={reviews.length} value={state.stars[0]}>1 stars</progress>
                    </div>
                </div>
            </div>
            <div className={s.container_review_all_positive_negative}>
                <button>
                    <div className={s.container_allPositiveNegative} onClick={() => onFilter()}>
                        <p>All</p>
                    </div>
                </button>
                <button>
                    <div className={s.container_allPositiveNegative} onClick={() => onFilter("positive")}>
                        <p>Positive</p>
                    </div>
                </button>
                <button>
                    <div className={s.container_allPositiveNegative} onClick={() => onFilter("negative")}>
                        <p>Negative</p>
                    </div>
                </button>
            </div>
            <div className={s.container_reviewList}>
                {state.reviews.map(review => 
                    <Review key={review.id} review={review} del={review.userId === user.id}/>
                )}
            </div>
            <div>
                {state.purchased && (
                    state.addReview ?
                        <FormAddReview onBack={onBack} productId={productId} review={reviews.find(review => review.userId === user.id)} />
                        :
                        <button className={s.btnReview} onClick={onAddReview}>My review</button>
                )}
            </div>
        </div>
    )
}