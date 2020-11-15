import React from 'react';
import s from './CheckCategory.module.css'

export default function CheckCategory({category, cheked, handleCheck }) {
    const onCheck = () => {
        handleCheck(category.id, !cheked)
        
    }
    return(
        <label className={s.label} onClick={onCheck}>
            <input
                type="checkbox"
                name={category.id}
                checked={cheked}
                readOnly
            />
            <label htmlFor={category.name}>{category.name}</label>
        </label>
    )
}
