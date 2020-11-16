import React from 'react';
import s from './DeleteProduct.module.css'

export default function DeleteCategory( { handleDelete, product, onNotSure } ){
    return (
        <div className={s.container_deleteCategory}>
            <div className={s.container_h3}>
                <h3>Seguro que desea eleminar el producto?</h3>
            </div>
            <div className={s.container_buttons_yes_no}>
                <button className={s.botonesSi} onClick={()=>handleDelete(product.id)}>Si</button>
                <button className={s.botonesNo} onClick={onNotSure} >No</button>
            </div>
        </div>
    )
}