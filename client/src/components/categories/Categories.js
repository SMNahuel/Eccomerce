import React, { useEffect, useState } from 'react';
import s from './Categories.module.css'


function Catalog() {

    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/category`)
        .then(r => r.json())
        .then(result => (
            setCategories(result)

        ))
        .catch(err => alert("Error!! " + err))
    }, [])

    return(
        <div>
            {categories && categories.map(e => (
                <div className={s.container_catalog_button}>
                    <button>{e.name}</button>
                </div>
            ))}
        </div>
    )
}
export default Catalog;