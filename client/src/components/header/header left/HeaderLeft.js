import React, { useState } from 'react';
import s from './HeaderLeft.module.css';
import Logo from './Logo/Logo';
import SearchBar from './SearchBar/SearchBar';


export default function HeaderLeft({ handleSearch, history }){
    const [ seachbar521px, setSeachBar521px ] = useState(false);

    const toggle = () =>{
        setSeachBar521px(!seachbar521px);
    }

    return (
        <div className={s.container_main}>
            {!seachbar521px &&
                <Logo load={history && history.length < 3}/>
            }
            {handleSearch && <SearchBar handleSearch={handleSearch} className={s.SearchBar} toggle={toggle} status={seachbar521px}/>}
        </div>
    )
}