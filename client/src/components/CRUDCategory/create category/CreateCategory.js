import React, { useState } from 'react';
import s from './CreateCategory.module.css';
function CreateCategory({ handleCreate }){
    const[input, setInput] = useState({
        name: "",
        description: ""
    })
    const onChange = function (e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventdefault()
        handleCreate(input)
    }
    return(
        <div className={s.container_create_category}>
            <h4>Crear una categoria</h4>
            <form  onSubmit={onSubmit} >
                <div className={s.container_input_textarea}>
                    <input name="name" value={input.name} onChange={onChange} placeholder="Nombre"></input>
                </div>
                <div className={s.container_input_textarea}>
                    <textarea 
                    name="description" 
                    value={input.description} 
                    onChange={onChange} 
                    placeholder="Descripcion"
                    maxLength="50"
                    >
                    </textarea>
                </div>
                <div className={s.container_button_create}>
                    <button type="submit">Create new Category</button>
                </div>
            </form>
        </div>
    )
}
export default CreateCategory;