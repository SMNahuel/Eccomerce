import React from 'react';
import s from './Pagination.module.css'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export default function Pagination({ paginate, postsPerPage }){

    const WindowScroll = () =>{
        window.scroll(0,0)
    }

    return (
        <div className={s.container_main}>
            <button onClick={() => paginate(10)}>See More</button>
            {
                postsPerPage >= 20 &&
                <div className={s.button_up} onClick={WindowScroll}>
                   <ArrowUpwardIcon fontSize="small"/>
                </div>
            }
        </div>
    )
}