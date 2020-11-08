import React from 'react';
import s from './ProductCard.module.css';

var lastClickTime = new Date().getTime();
export default ({product, onDetail, centered}) => {
    const image = `http://${window.location.hostname}:3001${product.images[0].url}`;

    const onClick = e => {
        var timesince = new Date().getTime() - lastClickTime;
        if(timesince < 600 && timesince > 0){
            onDetail(product);
        }
        lastClickTime = new Date().getTime();
    }

    return (
        <div id={product.id} onClick={onClick} className={centered ? s.centered : s.container} style={{backgroundImage:`url(${image})`}}>
            <div className={s.info} >
                <h1 className={s.name} >{product.name}</h1>
                <div className={s.ranking}>★★★★☆</div>
            </div>
        </div>
    )
}
