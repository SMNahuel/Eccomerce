import React, { useEffect, useState } from 'react';
import s from './CreateCategory.module.css';
import {validateCategory as validate} from '../../../utils/validator';

function CreateCategory({ handleCreate }){
    const[input, setInput] = useState({
        name: "",
        description: ""
    })
    const[err, setErr] = useState({})
    useEffect(()=>{
        setErr(validate(input))
    }, [input])
    const onChange = function (e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        handleCreate(input)
    }
    return(
        <div className={s.container_create_category}>
            <h4>Crear una categoria</h4>
            <form  onSubmit={onSubmit} >
                <div className={s.container_input_textarea}>
                    <input name="name" value={input.name} onChange={onChange} placeholder="Nombre"/>
                </div>
                <div>{err.name}</div>
                <div className={s.container_input_textarea}>
                    <textarea 
                        name="description" 
                        value={input.description} 
                        onChange={onChange} 
                        placeholder="Descripcion"
                        maxLength="50"
                    />
                </div>
                <div>{err.description}</div>
                <div className={s.container_button_create}>
                    <input type="submit" value={'Create new Category'} />
                </div>
            </form>
        </div>
    )
}
export default CreateCategory;