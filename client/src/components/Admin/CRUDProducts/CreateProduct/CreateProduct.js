import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckCategory from '../CheckCategory/CheckCategory';
import api from '../../../../redux/action-creators';


import s from './CreateProduct.module.css'

export default function CreateProduct({handleCreate, categories}) {
    const dispatch = useDispatch()
    const [ input, setInput ]  = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        categories: []
    })

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
        dispatch(api.createProduct(input))
        setInput({
            name: '',
            description: '',
            price: '',
            stock: '',
            categories: []
        })
    }

    return (
        <div className={s.container_form_addProduct}>
            <h4>Agregar producto</h4>
            <form onSubmit={onSubmit}>
                <div className={s.container_inputs_products}>
                    <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        onChange={onChange}
                        value={input.name}
                        maxLength="100"
                        placeholder="Ingrese el nombre"
                        pattern="[A-Za-z0-9 ]{5,100}"
                        required />
                    <label>Ingrese el nombre</label>
                </div>
                <div className={s.container_inputs_products}>
                    <input
                        type="text"
                        name="price"
                        onChange={onChange}
                        value={input.price}
                        pattern="[0-9,]{1,10}"
                        placeholder="Ingrese el precio"
                        title="Only Numbers"
                        autoComplete="off"
                        step="0.01"
                        required />
                    <label>Ingrese el precio</label>
                </div>
                <div className={s.container_inputs_products}>
                    <input
                        type="text"
                        name="stock"
                        pattern="[0-9]{1,999}"
                        autoComplete="off"
                        title="Only Numbers"
                        onChange={onChange}
                        value={input.stock}
                        placeholder="Ingrese el Stock"
                        required />
                    <label>Ingrese el Stock</label>
                </div>
                <div className={s.container_inputs_products}>
                    <textarea
                        type="text"
                        onChange={onChange}
                        value={input.description}
                        name="description"
                        maxLength="200"
                        pattern="[A-Za-z0-9 ]{5,250}"
                        autoComplete="off"
                        placeholder="Ingrese la descripcion"
                        required />
                    <label>Ingrese la descripcion</label>
                </div>
                <div className={s.container_label_product}>
                    {categories.length &&
                        categories.map(category => {
                            let cheked = input.categories.includes(category.id)
                            return <CheckCategory key={category.id} category={category} cheked={cheked} handleCheck={handleCheck} /> 
                        })
                    }
                </div>
                <input
                    className={s.input_submit}
                    type="submit"
                    value='Crear producto' />
            </form>
        </div>
    );
}
