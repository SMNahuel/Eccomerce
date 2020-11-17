import React from 'react';
import s from './Review.module.css'
import ReviewList from './reviewlist/ReviewList';
import stars from '../../../../utils/stars'

export default function Review() {
    return (
        <div className={s.container_review_main}>
            <div className={s.container_review_average}>
                <div className={s.container_average}>
                    <p className={s.p_number_average}>4.0</p>
                    <p className={s.p_stars}>{stars(4)}</p>
                    <p className={s.p_text}>Average based on X reviews</p>
                </div>
                <div className={s.container_progress}>
                    <div className={s.container_label_progress}>
                        <label>5 stars</label>
                        <progress max="100" value="90"></progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>4 stars</label>
                        <progress max="100" value="85">4 stars</progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>3 stars</label>
                        <progress max="100" value="95">3 stars</progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>2 stars</label>
                        <progress max="100" value="30">2 stars</progress>
                    </div>
                    <div className={s.container_label_progress}>
                        <label>1 stars</label>
                        <progress max="100" value="0">1 stars</progress>
                    </div>
                </div>
            </div>
            <div className={s.container_review_all_positive_negative}>
                <button>
                    <div className={s.container_allPositiveNegative}>
                        <p>All</p>
                    </div>
                </button>
                <button>
                    <div className={s.container_allPositiveNegative}>
                        <p>Positive</p>
                    </div>
                </button>
                <button>
                    <div className={s.container_allPositiveNegative}>
                        <p>Negative</p>
                    </div>
                </button>
            </div>
            <div className={s.container_reviewList}>
                <ReviewList stars={stars(5)}/>
                <ReviewList stars={stars(3)}/>
                <ReviewList stars={stars(5)}/>
                <ReviewList stars={stars(2)}/>
                <ReviewList stars={stars(1)}/>
                <ReviewList stars={stars(3)}/>
            </div>
        </div>
    )
}