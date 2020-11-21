import React from 'react';
import s from './Pagination.module.css'

export default function Pagination({ postsPerPage, totalProduct, paginate }){

    const pageNumber = [];
    for(let i = 1; i <= Math.ceil(totalProduct / postsPerPage); i++){
        pageNumber.push(i);
    }

    return (
        <div className={s.container_main}>
            {pageNumber && pageNumber.map(number => (
                <div key={number} onClick={() => paginate(number)} className={s.container_p}>
                    <p>{number}</p>
                </div>
            ))}
        </div>
    )
}