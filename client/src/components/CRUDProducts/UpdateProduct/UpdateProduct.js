import React, { useEffect, useState } from 'react';
import CheckCategory from '../CheckCategory/CheckCategory';
import ImageUploader from '../ImageUploader/ImageUploader'
import {validateProduct as validate} from '../../../utils/validator';

export default function UpdateProduct ({ product, categories, handleUpdate, s}) {
    const[input, setInput] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categories: product.categories && product.categories.map(c => c.id),
        images: []
    })

    const[err, setErr] = useState({})
    useEffect(()=>{
        setErr(validate(input))
    }, [input])

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
        <div name="arriba">
            <h4>Editar producto</h4>
            <form className={s.formulario} onSubmit={onSubmit}>
                <input className={s.controls} type="text" name="name" onChange={onChange} value={input.name} placeholder="Ingrese el nombre"/>
                <div>{err.name}</div>
                <input className={s.controls} type="number" name="price" onChange={onChange} value={input.price} placeholder="Ingrese el precio" step="0.01"/>
                <div>{err.price}</div>
                <input className={s.controls} type="number" name="stock" onChange={onChange} value={input.stock} placeholder="Ingrese el stock"/>
                <div>{err.stock}</div>
                <textarea className={s.controls} type="text" name="description" onChange={onChange} value={input.description} placeholder="Ingrese descripcion" maxLength="250"/>
                <div>{err.description}</div>
                <div >
                    {categories.length &&
                        categories.map(category => {
                            let cheked = input.categories.includes(category.id)
                            return <CheckCategory key={category.id} category={category} cheked={cheked} handleCheck={handleCheck} s={s} />
                        })
                    }
                </div>
                <ImageUploader product={product} images={input.images} setInput={setInput}/>
                <input className={s.botones} type="submit" value='Editar Producto'/>
            </form>
        </div>
    );
}
