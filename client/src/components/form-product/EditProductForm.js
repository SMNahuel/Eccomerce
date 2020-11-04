import React from 'react';
import {useForm} from 'react-hook-form';
//Instalamos Hook para hacer uso de la funciones de register errors y handleSubmit
const EditProductForm = (props) =>{
    console.log(props)
    const {register, errors, handleSubmit, setValue} = useForm({
        defaultValues: props.currentProduct
    });
    setValue('name', props.currentProduct.name);
    setValue('description', props.currentProduct.description);
    setValue('price', props.currentProduct.price);
    setValue('stock', props.currentProduct.stock);
    

    const onSubmit = (data, e) =>{
        console.log(data);
        data.id = props.currentProduct
        props.updateProduct(props.currentProduct.id, data)
        
        //Limpiar campos
        e.target.reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
        <input type="text" name="description" ref={
            register({
                required: {value: true, message: 'Campo requerido'}
            })
        }/>
        <label>Price</label>
        <input type="text" name="price"ref={
            register({
                required: {value: true, message: 'Campo requerido'}
            })
        }/>
        <label>Stock</label>
        <input type="text" name="stock"ref={
            register({
                required: {value: true, message: 'Campo requerido'}
            })
        }/>
        <button>Edit product</button>
      </form>
    );
}

export default EditProductForm;