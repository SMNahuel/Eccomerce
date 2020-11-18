import React from 'react';
import s from './Description.module.css';
import CheckIcon from '@material-ui/icons/Check';

export default function Description({product}){

    return (
        <div className={s.container_description}>
            <p>{product.description}</p>
            <div className={s.container_empty}></div>
            <div className={s.container_ul}>
                <ul>
                    <li>
                        <CheckIcon fontSize="small" className={s.CheckIcon}/>
                        Build, test, and launch React apps
                    </li>
                    <li>
                        <CheckIcon fontSize="small" className={s.CheckIcon}/>
                        Setup authentication and user accounts
                    </li>
                    <li>
                        <CheckIcon fontSize="small" className={s.CheckIcon}/>
                        Learn the latest React libraries and tools
                    </li>
                    <li>
                        <CheckIcon fontSize="small" className={s.CheckIcon}/>
                        Use cutting-edge ES6/ES7 JavaScript
                    </li>
                    <li>
                        <CheckIcon fontSize="small" className={s.CheckIcon}/>
                        Deploy your React apps live to the web
                    </li>
                    <li>
                        <CheckIcon fontSize="small" className={s.CheckIcon}/>
                        Master React, Redux, React-Router, and more
                    </li>
                    <li>
                        <CheckIcon fontSize="small" className={s.CheckIcon}/>
                        Become an advanced, confident, and modern JavaScript developer from scratch
                    </li>
                    <li>
                        <CheckIcon fontSize="small" className={s.CheckIcon}/>
                        JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, etc.
                    </li>
                </ul>
            </div>
        </div>
    )
}