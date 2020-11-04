import React from 'react';
import {useForm} from 'react-hook-form';
//Instalamos Hook para hacer uso de la funciones de register errors y handleSubmit
const AddProductForm = (props) =>{

    const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data, e) =>{

        console.log(data);

        //Mandamos el producto al state
        props.addProduct(data);
        
        //Limpiar campos
        e.target.reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
        <div>
            <label>Name</label>
            <input type="text" name="name" ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }/>
                <div>
                    {errors?.name?.message}
                </div>
            <label>Description</label>
            <input type="text" name="description"ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }/>
                <div>
                    {errors?.name?.message}
                </div>
            <label>Price</label>
            <input type="text" name="price"ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }/>
                <div>
                    {errors?.name?.message}
                </div>
            <label>Stock</label>
            <input type="text" name="stock"ref={
                register({
                    required: {value: true, message: 'Campo requerido'}
                })
            }/>
                <div>
                    {errors?.name?.message}
                </div>
            <button>Add new product</button>
        </div>
      </form>
    );
}

export default AddProductForm;