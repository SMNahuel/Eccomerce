import React from 'react'
import s from './ProductCard.module.css'

function ProductCard({product}){
    return(
        <div className={s.container_product_card}>
            <div className={s.container_img}>
                <img src="https://i.ytimg.com/vi/z95mZVUcJ-E/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLACmaQFGOIHTRS7kqUsWUAuM4tvKA" alt="imagen curso javascript"/>
            </div>
            <div className={s.container_details}>
                <div>
                    <h3 className={s.container_title}>{product.name}</h3>
                </div>
                <div className={s.container_about}>
                    <p>{product.description}</p>
                </div>
                <div className={s.container_author}>
                    <p>Author:</p>
                </div>
                <div className={s.container_ranking}>
                    <p>4.3 ★★★★</p>
                </div>
                <div className={s.container_price}>
                    <p>${product.price}</p>
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