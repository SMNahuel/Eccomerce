import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creators';
import {validateProduct as validate} from '../../../utils/validator';
import CheckCategory from '../CheckCategory/CheckCategory';

export default function CreateProduct({handleCreate, s}) {
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

    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories)
    
    useEffect(()=>{
        if (!categories[0]){
            dispatch(api.getCategories())
        }
    }, [dispatch, categories])

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
                    {categories[0] &&
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