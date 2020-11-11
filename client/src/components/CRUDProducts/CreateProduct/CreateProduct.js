import React, { useEffect, useState } from 'react';
import CheckCategory from '../CheckCategory/CheckCategory';
import {validateProduct as validate} from '../../../utils/validator';

export default function CreateProduct({handleCreate, categories, s}) {
    const[input, setInput] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        categories: []
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
    const handleCheck = (id, check) => {
        if(check){
            setInput({
                ...input,
                categories: input.categories.concat(id)
            })
        }else{
            setInput({
                ...input,
                categories: input.categories.filter( i => i !== id)
            })
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        handleCreate(input)
    }

    return (
        <div>
            <form
                className={s.formulario}
                onSubmit={onSubmit}
            >
                <h4>Agregar producto</h4>
                <input className={s.controls} type="text" name="name" onChange={onChange} placeholder="Ingrese el nombre"/>
                <div>{err.name}</div>
                <input className={s.controls} type="number" name="price" onChange={onChange} placeholder="Ingrese el precio" step="0.01"/>
                <div>{err.price}</div>
                <input className={s.controls} type="number" name="stock" onChange={onChange} placeholder="Ingrese el stock"/>
                <div>{err.stock}</div>
                <textarea className={s.controls} type="text" name="description" onChange={onChange} placeholder="Ingrese descripcion" maxLength="250"/>
                <div>{err.description}</div>
                <div >
                    {categories.length &&
                        categories.map(category => {
                            let cheked = input.categories.includes(category.id)
                            return <CheckCategory key={category.id} category={category} cheked={cheked} handleCheck={handleCheck} s={s} />
                        })
                    }
                </div>
                <input className={s.botones} type="submit" value='Crear producto'/>
            </form>
        </div>
    );
}