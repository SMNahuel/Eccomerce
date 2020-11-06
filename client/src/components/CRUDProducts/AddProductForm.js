import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import style from './FormProduct.module.css';
//Instalamos Hook para hacer uso de la funciones de register errors y handleSubmit
const AddProductForm = ({handleCreate}) =>{

    const {register, errors} = useForm();
    const [state, setState] = useState({
       name: '',
       description: '',
       price: '',
       stock: ''
    });

    const sendProduct = (e) =>{
        handleCreate(state)
    }

    return (
        <div>
        <form onSubmit={sendProduct}>
            <h4>Agregar producto</h4>
            <input 
            className={style.controls} 
            type="text" name="name" 
            placeholder= "Ingrese el nombre"
            ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }
            onChange={(e)=>{
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
            className={style.controls} 
            type="text" name="description" 
            placeholder= "Ingrese descripcion" 
            ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }
            onChange={(e)=>{
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
            className={style.controls} 
            type="text"  
            name="price" 
            placeholder= "Ingrese el precio"
            ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }
            onChange={(e)=>{
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
            className={style.controls} 
            type="text" 
            name="stock" 
            placeholder= "Ingrese el stock"
            ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }
            onChange={(e)=>{
                setState({                  
                    ...state,
                    [e.target.name]: e.target.value
                })
            }}
            />
                <div>
                    {errors?.name?.message}
                </div>
            <button className={style.botones} >Add new product</button>
      </form>
      </div>
    );
}

export default AddProductForm;