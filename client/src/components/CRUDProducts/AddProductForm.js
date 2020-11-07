import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import s from './FormProduct.module.css';
//Instalamos Hook para hacer uso de la funciones de register errors y handleSubmit
const AddProductForm = ({handleCreate}) =>{

    const {register, errors} = useForm();
    const [state, setState] = useState({
       name: '',
       description: '',
       price: '',
       stock: '',
       categories: []
    });

    const [categories, setCategory] = useState([])
    useEffect(() => {
        axios.get(`http://${window.location.hostname}:3001/category`)
        .then(({data}) => 
            //Seteamos las categorias a nuestro estado
            setCategory(data)
        )
    }, [])

    const sendProduct = (e) =>{
        handleCreate(state)
    }
    const onCheck = (e) => {
        if(e.target.checked){
            setState({
                ...state,
                categories: state.categories.concat(e.target.name)
            })
        }else{
            setState({
                ...state,
                categories: state.categories.filter( id => id !== e.target.name)
            })
        }
        
    }   

    return (
        <div>
            <form
                className={s.formulario}
                onSubmit={sendProduct}>
                <h4>Agregar producto</h4>
                <input
                    className={s.controls}
                    type="text" name="name"
                    placeholder="Ingrese el nombre"
                    ref={
                        register({
                            required: { value: true, message: 'Campo requerido' }
                        })
                    }
                    onChange={(e) => {
                        setState({
                            ...state,
                            [e.target.name]: e.target.value
                        })
                    }}
                />
                <div>
                    {errors?.name?.message}
                </div>
                <input
                    className={s.controls}
                    type="text" name="description"
                    placeholder="Ingrese descripcion"
                    ref={
                        register({
                            required: { value: true, message: 'Campo requerido' }
                        })
                    }
                    onChange={(e) => {
                        setState({
                            ...state,
                            [e.target.name]: e.target.value
                        })
                    }}
                />
                <div>
                    {errors?.name?.message}
                </div>
                <input
                    className={s.controls}
                    type="text"
                    name="price"
                    placeholder="Ingrese el precio"
                    ref={
                        register({
                            required: { value: true, message: 'Campo requerido' }
                        })
                    }
                    onChange={(e) => {
                        setState({
                            ...state,
                            [e.target.name]: e.target.value
                        })
                    }}
                />
                <div>
                    {errors?.name?.message}
                </div>
                <input
                    className={s.controls}
                    type="text"
                    name="stock"
                    placeholder="Ingrese el stock"
                    ref={
                        register({
                            required: { value: true, message: 'Campo requerido' }
                        })
                    }
                    onChange={(e) => {
                        setState({
                            ...state,
                            [e.target.name]: e.target.value
                        })
                    }}
                />
                <div >
                    {/* @Nahuel */}
                    {categories.map(c =>
                        <label
                            className={s.checkbox}
                            key={c.id}>
                            <input
                                type="checkbox"
                                name={c.id}
                                id={c.name}
                                onChange={onCheck}
                            />

                            <label for={c.name}>
                                {c.name}
                            </label>
                        </label>
                    )}
                </div>
                <div>
                    {errors?.name?.message}
                </div>
                <button className={s.botones} >Add new product</button>
            </form>
        </div>
    );
}

export default AddProductForm;