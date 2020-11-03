import React from 'react';
import s from './CatalogCourse.module.css';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

function CatalogCourse(){

    return (
        <div className={s.container_catalog}>
            <div className={s.container_main_catalog}>
                <p>Most popular</p>
                <div className={s.container_course_catalog}>
                    <button>
                        <p>Web Development</p>
                        <ArrowRightIcon fontSize="small" />
                    </button>
                </div>
            </div>
            <div className={s.container_catalog_button}>
                <button >X</button>
            </div>
            

        </div>
    )
}
export default CatalogCourse;