import React, { useState } from 'react';
import s from './Categories.module.css'

function Catalog() {

    const [ categories, setCategories ] = useState([])
    fetch('https://localhost:3001/category')
        .then(res => res.json())
        .then(result => (
            setCategories(result)

        ))
        .catch(err => alert("Error!!" + err))
    
    return(
        <div>
            {categories.map(e => (

                <div className={s.container_catalog_button}>
                    <button>{e.name}</button>
                </div>
            ))}
        </div>
    )
}
export default Catalog;