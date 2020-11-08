import React, { useState } from 'react';
import s from '../CRUDCategory.module.css';
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
        <div className>
            <h4>Crear una categoria</h4>
            <form  onSubmit={onSubmit} >
                <div >
                    <input  className={s.controls} name="name" value={input.name} onChange={changeState} placeholder="Nombre"></input>
                </div>
                <div >
                    <textarea   className={s.controls} name="description" value={input.description} onChange={changeState} placeholder="Descripcion"></textarea>
                </div>
                <input className={s.botones}  type="submit"  value={'Create new categorie'}/>
            </form>
        </div>
    )
}
export default CreateCategory;