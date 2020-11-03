import React from 'react';
import s from './CatalogCourse.module.css';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

function CatalogCourse(){
    const arrayCatalog = [ "Web Development", "Mobile Development", "Game Development", "Entrepreneurship", "Business Analytics & Intelligence", "Digital Marketing", "Graphic Design & Illustration", "IT Certification", "Personal Transformation", "All categories"]

    return (
        <div className={s.container_catalog}>
            <div className={s.container_main_catalog}>
                <p>Most popular</p>
                {arrayCatalog.map( e => (
                    <div className={s.container_course_catalog}>
                        <button>
                            <p>{e}</p>
                            <ArrowRightIcon fontSize="small" />
                        </button>
                    </div>
                ))}
                
            </div>
            <div className={s.container_catalog_button}>
                <button >X</button>
            </div>
            

        </div>
    )
}
export default CatalogCourse;