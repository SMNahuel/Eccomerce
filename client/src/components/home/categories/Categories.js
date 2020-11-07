import React from 'react';
import s from './Categories.module.css'


export default function Categories({categories, onSelect, onClear, selectedCategory}) {

    return(
        <div className={s.container_catalog}>
            {categories && 
                categories.map(category => (
                    <div className={s.container_catalog_button} key={category.id} >
                        <button 
                            onClick={category.id === selectedCategory ? onClear : onSelect} 
                            value={category.id} 
                            style={category.id === selectedCategory ? {background: 'blue'} : {background: 'green'}} 
                        >
                            {category.name}
                        </button>
                    </div>
                ))
            }
        </div>
    )
}