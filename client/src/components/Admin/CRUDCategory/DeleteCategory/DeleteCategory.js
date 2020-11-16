import React from 'react';
import s from './DeleteCategory.module.css';

export default function DeleteCategory( { handleDelete, category, onNotSure } ){
    return (
        <div>
            <div className={s.container_h3}>
                <h3>Seguro que desea eleminar la categoria?</h3>
            </div>
            <div className={s.container_buttons_yes_no}>
                <button className={s.botonesSi} onClick={()=>handleDelete(category.id)}>Si</button>
                <button className={s.botonesNo} onClick={onNotSure} >No</button>
            </div>
        </div>
    )
}
