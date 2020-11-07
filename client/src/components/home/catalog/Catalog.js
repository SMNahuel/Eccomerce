import React from 'react';
import s from './Catalog.module.css'
import ProductCard from './product card/ProductCard';

export default function Catlaog({catalog, handleDetail}) {
    return(
        <div className={s.container_productCard}>
            {catalog && 
                catalog.map(product => <ProductCard key={product.id} product={product} onDetail={handleDetail} />)
            }
        </div>
    )
}