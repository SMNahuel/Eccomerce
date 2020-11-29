import React from 'react';
import s from './Catalog.module.css'
import ProductCard from './ProductCard/ProductCard';

export default function Catalog({products, handleDetail}) {
    return(
        <div className={s.container_main}>
            <div className={s.container_card}>
                {products &&
                    products.map(product => (
                        <div key={product.id}>
                            <ProductCard product={product} onDetail={handleDetail} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
