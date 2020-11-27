import React, { useState } from 'react';
import s from './SearchBar521.module.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchBar521({ handleSearch, toggle }){
    const [key, setKey] = useState("");
    const onChange = (e)=>{
        setKey(e.target.value);
    }
    const onSearch = (e)=>{
        handleSearch(key);
        setKey('')
    }

    return (
        <div className={s.container_main}>
            <div className={s.container_arrowBack} onClick={toggle}>
                <ArrowBackIcon/>
            </div>
            <div className={s.container_input_buttons}>
                <input
                    type="text"
                    value={key}
                    onChange={onChange}
                    placeholder="Seach..."
                    pattern="[A-Za-z0-9]{3,50}"
                    title="Min 3 character"
                    required />
                <button className={s.button} onClick={onSearch}><SearchIcon /></button>
            </div>
        </div>
    )
}