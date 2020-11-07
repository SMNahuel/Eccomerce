import React, { useState } from 'react';
import s from './CreateCategory.module.css';

function CreateCategory({ handleCreate }){
    const[input, setInput] = useState({
        name: "",
        description: ""
    })
    const changeState = function (e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        handleCreate(input)
    }
    return(
        <div className={s.container_create_category}>
            <h3 className={s.title}>Categories</h3>
            <form className={s.form} onSubmit={onSubmit} >
                <div className={s.section}>
                    <label className={s.label}>Name:</label>
                    <input className={s.input} name="name" value={input.name} onChange={changeState}></input>
                </div>
                <div className={s.section}>
                    <label className={s.label}>Description:</label>
                    <textarea className={`${s.input} ${s.area}`}  name="description" value={input.description} onChange={changeState}></textarea>
                </div>
                <input type="submit" className={s.btn} value={'Create new categorie'}/>
            </form>
        </div>
    )
}
export default CreateCategory;