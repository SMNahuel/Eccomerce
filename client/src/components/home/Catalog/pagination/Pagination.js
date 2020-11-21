import React from 'react';
import s from './Pagination.module.css'

export default function Pagination({ paginate }){

    return (
        <div className={s.container_main}>
            <button onClick={() => paginate(10)}>See More</button>
        </div>
    )
}