import React, {useState, useEffect, useRef} from 'react';
import s from './Catalog.module.css'
import ProductCard from './product card/ProductCard';


export default function Catlaog({catalog, handleDetail}) {
    const [centeredId, setCenteredId] = useState(1)
    const ref = useRef(null)

    const windowXCenter = window.innerWidth / 2
    const setCenteredChildren = e => {
        let children = Array.from(ref.current.children);
        for (let i = 0; i < children.length; i++) {
            let data = children[i].getBoundingClientRect();
            if (Math.abs((data.x + data.width / 2) - windowXCenter) < 100) {
                return setCenteredId(Number(children[i].id))
            }
        }
    }
    
    var timeoutId;
    const onScroll = event => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(setCenteredChildren, 200)
    }

    useEffect(setCenteredChildren, [catalog])

    return(
        <div className={s.container} onScroll={onScroll} ref={ref}>
            {catalog[0] && 
                catalog.map(product => <ProductCard key={product.id} product={product} onDetail={handleDetail} centered={centeredId === product.id} />)
            }
        </div>
    )
}