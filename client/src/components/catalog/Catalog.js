import React from 'react';
import s from './Catalog.module.css'

function Catalog (){

    const arrayCourse = ["Css", "Html", "JavaScript", "Python", "Java", "React", "Angular", "Ruby"]
    return (
        <div className={s.container_catalog}>

            {arrayCourse.map(e => (
                <div className={s.container_catalog_button}>
                    <button>{e}</button>
                </div>
            ))}


        </div>
    )
}
export default Catalog;