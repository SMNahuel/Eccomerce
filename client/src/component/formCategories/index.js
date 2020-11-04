import React, { useState } from 'react';
import S from './formCategories.module.css'

export default function FormCategories(){
    const[input, setInput] = useState({
        name: "",
        description: ""
    })
    const createCategory = function(){
        //send state to backend to create new category
        console.log(input)
    }
    const changeState = function (e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    return(
        <div>
            <h1 className={S.title}>Categories</h1>
            <form className={S.form}>
                <div className={S.section}>
                    <label className={S.label}>Name:</label><br/>
                    <input className={S.input} name="name" value={input.name} onChange={changeState}></input>
                </div>
                <div className={S.section}>
                    <label className={S.label}>Description:</label>
                    <textarea className={S.input, S.area}  name="description" value={input.description} onChange={changeState}></textarea>
                </div>
                <button className={S.btn} onClick={createCategory}>Create new categorie</button>
            </form>
        </div>
    )
}