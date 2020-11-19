import React, { useState } from 'react';
import s from './Review.module.css'
import ReviewList from './reviewlist/ReviewList';
import stars from '../../../../utils/stars'
import FormAddReview from './formAddReview/formAddReview'

export default function Review({reviews, productId}) {
    const [addReview, setAddReview] = useState(false)
    const [seeReview, setReview] = useState(reviews)
    const onAddReview = () => {
        setAddReview(!addReview)
    }
    const onReview = (state) => {
        if(state === "all") setReview(reviews)
        if(state === "positive"){
            let reviewsFiltred = reviews.filter(review => review.qualification > 2)
            setReview(reviewsFiltred)
        }
        if(state === "negative"){
            let reviewsFiltred = reviews.filter(review => review.qualification < 4)
            setReview(reviewsFiltred)
        }
    }
    const quantityStar = (num) => {
        return reviews.filter(review => review.qualification === num).length
    }
    const numberAverage = () => {
        let stars = 0
        reviews.map(review => stars += (review.qualification))
        return (stars/reviews.length).toFixed(1)
    }
    return (
        <div className={s.container_review_main}>
            <div className={s.container_review_average}>
                <div className={s.container_average}>
                    <p className={s.p_number_average}>{numberAverage()}</p>
                    <p className={s.p_stars}>{stars(Math.round(numberAverage()))}</p>
                    <p className={s.p_text}>Average based on {reviews.length} reviews</p>
                </div>
                <div className={s.container_progress}>
                    <div className={s.container_label_progress}>
                        <label>5 stars</label>
                        <progress max={reviews.length} value={quantityStar(5)}></progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>4 stars</label>
                        <progress max={reviews.length} value={quantityStar(4)}>4 stars</progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>3 stars</label>
                        <progress max={reviews.length} value={quantityStar(3)}>3 stars</progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>2 stars</label>
                        <progress max={reviews.length} value={quantityStar(2)}>2 stars</progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>1 stars</label>
                        <progress max={reviews.length} value={quantityStar(1)}>1 stars</progress>
                    </div>
                </div>
            </div>
            <button onClick={() => onAddReview()}>Add my review</button>
            {addReview && <FormAddReview setAddReview={setAddReview} productId={productId}/>}
            <div className={s.container_review_all_positive_negative}>
                <button>
                    <div className={s.container_allPositiveNegative} onClick={() => onReview("all")}>
                        <p>All</p>
                    </div>
                </button>
                <button>
                    <div className={s.container_allPositiveNegative} onClick={() => onReview("positive")}>
                        <p>Positive</p>
                    </div>
                </button>
                <button>
                    <div className={s.container_allPositiveNegative} onClick={() => onReview("negative")}>
                        <p>Negative</p>
                    </div>
                </button>
            </div>
            <div className={s.container_reviewList}>
                {seeReview.map(review => (
                    <ReviewList
                    stars={stars(review.qualification)}
                    key={review.id}
                    message={review.message}
                    user={review.user.name}
                    />
                ))}
            </div>
        </div>
    )
}