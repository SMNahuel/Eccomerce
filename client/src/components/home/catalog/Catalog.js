import React, {useState, useEffect, useRef} from 'react';
import s from './Catalog.module.css'
import ProductCard from './ProductCard/ProductCard';


export default function Catalog({products, handleDetail}) {
    const [centeredId, setCenteredId] = useState(1)
    const ref = useRef(null)

    const windowXCenter = window.innerWidth / 2
    const setCenteredChildren = e => {
        let children = Array.from(ref.current.children);
        for (let i = 0; i < children.length; i++) {
            let data = children[i].getBoundingClientRect();
            if (Math.abs((data.x + data.width / 2) - windowXCenter) < 100) {
                return setCenteredId(children[i].id)
            }
        }
    }
    
    var timeoutId;
    const onScroll = event => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(setCenteredChildren, 200)
    }

    useEffect(setCenteredChildren, [products])

    return(
        <div className={s.container} onScroll={onScroll} ref={ref}>
            {products && 
                products.map(product => <ProductCard key={product.id} product={product} onDetail={handleDetail} centered={Number(centeredId) === Number(product.id)} />)
            }
        </div>
    )
}