import React from 'react'
import s from './ProductCard.module.css'

function ProductCard(){
    return(
        <div className={s.container_product_card}>
            <div className={s.container_img}>
                <img src="https://i.ytimg.com/vi/z95mZVUcJ-E/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLACmaQFGOIHTRS7kqUsWUAuM4tvKA"/>
            </div>
            <div className={s.container_details}>
                <div className={s.container_title}>
                    <h3>JavaScript course for beginners</h3>
                </div>
                <div className={s.container_about}>
                    <p>About this course: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it</p>
                </div>
                <div className={s.container_author}>
                    <p>Author:</p>
                </div>
                <div className={s.container_ranking}>
                    <p>4.3 ★★★★</p>
                </div>
                <div className={s.container_price}>
                    <p>$11.99 <strong>$39.99</strong> </p>
                </div>
                <div className={s.container_button_see_more}>
                    <button>See More</button>
                </div>
            </div>
            <div className={s.container_button_add_to_card}>
                <button>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
export default ProductCard;