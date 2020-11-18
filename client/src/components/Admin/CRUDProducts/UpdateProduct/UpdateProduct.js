import React, { useState } from 'react';
import CheckCategory from '../CheckCategory/CheckCategory';
import ImageUploader from '../ImageUploader/ImageUploader'
import s from './UpdateProduct.module.css'

export default function UpdateProduct ({ product, categories, handleUpdate }) {
    const[input, setInput] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categories: product.categories && product.categories.map(c => c.id),
        images: []
    })

    const onChange = ({target}) => {
        let newInput = {...input}
        newInput[target.name] = target.value
        setInput(newInput)
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
        handleUpdate(product.id, input)
    }

    return (
        <div name="arriba" className={s.container_form_updateProduct}>
            <h4>Editar producto</h4>
            <form onSubmit={onSubmit}>
                <div className={s.container_inputs_products}>
                    <input
                        className={s.controls}
                        type="text"
                        name="name"
                        value={input.name}
                        autoComplete="off"
                        onChange={onChange}
                        maxLength="100"
                        placeholder="Ingrese el nombre"
                        pattern="[A-Za-z0-9 ]{3,100}"
                        required />
                    <label>Nombre</label>
                </div>
                <div className={s.container_inputs_products}>
                    <input
                        className={s.controls}
                        type="number"
                        name="price"
                        value={input.price}
                        onChange={onChange}
                        pattern="[0-9]{1,10}"
                        placeholder="Ingrese el precio"
                        title="Only Numbers"
                        autoComplete="off"
                        step="0.01"
                        required />
                    <label>Price</label>
                </div>
                <div className={s.container_inputs_products}>
                    <input
                        className={s.controls}
                        type="number"
                        name="stock"
                        onChange={onChange}
                        value={input.stock}
                        pattern="[0-9]{1,999}"
                        autoComplete="off"
                        title="Only Numbers"
                        placeholder="Ingrese el Stock"
                        required />
                    <label>Stock</label>
                </div>
                <div className={s.container_inputs_products}>
                    <textarea
                        className={s.controls}
                        type="text"
                        name="description"
                        onChange={onChange}
                        value={input.description}
                        maxLength="200"
                        pattern="[A-Za-z0-9 ]{5,250}"
                        autoComplete="off"
                        placeholder="Ingrese la descripcion"
                        required />
                    <label>Description</label>
                </div>
                <div className={s.container_label_product}>
                    {categories.length &&
                        categories.map(category => {
                            let cheked = input.categories.includes(category.id)
                            return <CheckCategory key={category.id} category={category} cheked={cheked} handleCheck={handleCheck} s={s} />
                        })
                    }
                </div>
                <ImageUploader
                    product={product}
                    images={input.images}
                    setInput={setInput} />
                <input
                    className={s.input_submit}
                    type="submit"
                    value='Editar Producto' />
            </form>
        </div>
    );
}
