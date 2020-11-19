import React, { useState } from 'react'
import axios from 'axios'

export default function FormAddReview({setAddReview, productId}){
    const [review, setReview] = useState({
        message:"soy un review",
        qualification: 5
    })
    const finishReview = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/products/review/${productId}`,
        review,
        {withCredentials: true})
        .then(setAddReview())
    }
    return(
        <div>
            <button onClick={() => finishReview()}>Send Review</button>
        </div>
    )
}