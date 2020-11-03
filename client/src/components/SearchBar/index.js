import React, {useState} from 'react';
import Styles from './searchBar.module.css'

export default function SearchBar(){
    const [search, setSearch] = useState("")
    const changeInput = function(e){
        setSearch(e.target.value)
    }

    return(
        <div>
            <input type="text" value={search} onChange ={changeInput} placeholder="Seach..." className={Styles.search}/>
            <button className="button"></button>
        </div>
    )
}