import React from 'react';
import s from './Categories.module.css'


export default function Categories({categories, onSelect}) {

    return(
        <div className={s.container_catalog}>
            {categories && 
                categories.map(category => (
                    <div className={s.container_catalog_button} key={category.id}>
                        <button onClick={onSelect} value={category.id} >{category.name}</button>
                    </div>
                ))
            }
        </div>
    )
}