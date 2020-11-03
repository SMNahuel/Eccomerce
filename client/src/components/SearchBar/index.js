import React, {useState} from 'react';
import Styles from './searchBar.module.css'

export default function SearchBar(){
    const [search, setSearch] = useState("")
    const changeInput = function(e){
        setSearch(e.target.value)
    }
    const seachInDB = function (){
        //busca con el estado actual
        //search
    }
    return(
        <div className={Styles.searchBar}>
            <input type="text" value={search} onChange ={changeInput} placeholder="Seach..." className={Styles.search}/>
            <button className={Styles.button} onClick={seachInDB}>.</button>
        </div>
    )
}