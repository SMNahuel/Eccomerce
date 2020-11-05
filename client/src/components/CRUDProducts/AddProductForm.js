import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import style from './FormProduct.module.css';
//Instalamos Hook para hacer uso de la funciones de register errors y handleSubmit
const AddProductForm = () =>{

    const {register, errors} = useForm();
    const [state, setState] = useState({
        product: []
    });

    const sendProduct = (e) =>{
        e.preventDefault()

        fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.product)
        })
            .catch(err => console.log(err))
            .then(res => res.json())
            .then(thing => console.log(thing))
    }

    return (
        <div>
        <form >
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
                    product: {
                        ...state.product,
                        name: e.target.value
                    }
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
                    product: {
                        ...state.products,
                        description: e.target.value
                    }
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
                    product: {
                        ...state.products,
                        price: e.target.value
                    }
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
                    product: {
                        ...state.products,
                        stock: e.target.value
                    }
                })
            }}
            />
                <div>
                    {errors?.name?.message}
                </div>
            <button className={style.botones} onSubmit={sendProduct}>Add new product</button>
      </form>
      </div>
    );
}

export default AddProductForm;