import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import style from './FormProduct.module.css';
//Instalamos Hook para hacer uso de la funciones de register errors y handleSubmit
const AddProductForm = ({handleCreate}) =>{

    const {register, errors} = useForm();
    const [state, setState] = useState({
       name: '',
       description: '',
       price: '',
       stock: '',
       categories: ''
    });

    const [categories, setCategory] = useState({
        categories: ''
    })
    useEffect(() => {
        axios.get(`http://${window.location.hostname}:3001/category`)
        .then(({data}) => 
            //Seteamos las categorias a nuestro estado
            setCategory(state =>({
                ...state,
                categories: data.categories
            }))
        )
    }, [])

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
            {/* @Nahuel */}
            {/* Estoy tratando de mapear categories con un input*/}
            
            {console.log(categories.categories)}
            {/* <input 
            type="checkbox"
            name={categories.name}
            /> */}

                <div>
                    {errors?.name?.message}
                </div>
            <button className={style.botones} >Add new product</button>
      </form>
      </div>
    );
}

export default AddProductForm;