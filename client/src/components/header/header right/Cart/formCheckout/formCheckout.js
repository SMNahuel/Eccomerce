import React, { useState } from 'react'
import ProductCart from './ProductCart/productCart'
import s from './formCheckout.module.css'

export default function FormCheckout({items, price, user}){
    
    const [input, setInput] = useState({
        domicilio: "",
        telefono: "",
        email: user.email
    })
    const [error, setError] = useState({})
    
    const validate = (input) => {
        error.domicilio = ""
        error.email = ""
        if(!input.domicilio){
            error.domicilio = "Este campo es requerido"
        }else if(input.domicilio.length < 4){
            error.domicilio = "Se requiere un domicilio valido"
        }
        if(!input.email){
            error.email = "Este campo es requerido"
        }else if(!/\S+@\S+\.\S+/.test(input.email)){
            error.email = "Se requiere un email valido"
        }
        return error
    }

    const onChange = function (e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    return(
        <div>
            <div className={s.container}>
                <div className={s.form}>
                    <p style={{color: "grey"}}>los campos con <em style={{color: "red"}}>* </em> son obligatorios</p><br/>
                    <label>Domicilio<em style={{color: "red"}}>*</em></label>
                    <input type="text" name="domicilio" value={input.domicilio} onChange={onChange} placeholder="Domicilio..."/>
                    {error.domicilio && 
                        <p className={s.error}>{error.domicilio}</p>
                    }
                    <br/>
                    <label>Telefono de Contacto </label>
                    <input type="text" name="telefono" value={input.telefono} onChange={onChange} placeholder="Telefono..."/>
                    <br/>
                    <label>A que email queres que te lleguen los cursos?<em style={{color: "red"}}>* </em></label>
                    <input type="text" name="email" value={input.email} onChange={onChange} placeholder="email..."/>
                    {error.email && 
                        <p className={s.error}>{error.email}</p>
                    }
                </div>
                <div className={s.products}>
                    {items.products.map(product => (
                        <ProductCart key={product.id} product={product}/>
                    ))}
                    <p>${price}</p>
                </div>
            </div>
            <div className={s.container_buttons}>
                <input type="button" onClick={() => console.log(input)} value="Confirmar compra!"/>
                <input type="button" onClick={() => console.log(input)} value="Seguir comprando"/>
            </div>
        </div>
    )
}