import React, { useState } from 'react';
import Logo from './Logo/Logo';
import s from './HeaderLeft.module.css';
import SearchBar from './SearchBar/SearchBar';


export default function HeaderLeft({ handleSearch }){
    const [ seachbar521px, setSeachBar521px ] = useState(false);

    const toggle = () =>{
        setSeachBar521px(!seachbar521px);
    }

    return (
        <div className={s.container_main}>
            {
                !seachbar521px &&
                <Logo style={{visibility: "hidden"}}/>
            }
            <SearchBar handleSearch={handleSearch} className={s.SearchBar} toggle={toggle} status={seachbar521px}/>
        </div>
    )
}