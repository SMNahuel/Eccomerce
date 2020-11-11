import React from 'react';

export default function CheckCategory({category, cheked, handleCheck, s}) {
    const onCheck = () => {
        handleCheck(category.id, !cheked)
    }
    return(
        <label className={s.checkbox} onClick={onCheck}>
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