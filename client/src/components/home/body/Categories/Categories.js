import React from 'react';
import s from './Categories.module.css'


export default function Categories({categories, onSelect, onClear, selectedCategory}) {
    return(
        <div className={s.container}>
            <div className={s.categories}>
                {categories && 
                    categories.map(category => (
                        <button 
                            key={category.id} 
                            onClick={category.id === selectedCategory ? onClear : onSelect} 
                            value={category.id} 
                            style={category.id === selectedCategory ? {filter: 'hue-rotate(-180deg)', color: "#282C34"} : {}} 
                        >
                            {category.name}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}