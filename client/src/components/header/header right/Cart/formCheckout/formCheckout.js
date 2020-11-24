import React, { useState } from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function FormCheckout({items, price}){
    console.log(price)
    const [input, setInput] = useState({
        domicilio: "",
        telefono: ""
    })

    const onChange = function (e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div>
            <div style={{color: "black",display: "flex"}}>
                <div>
                    <HighlightOffIcon/>
                    <p style={{color: "grey"}}>los campos con <em style={{color: "red"}}>*</em> son obligatorios</p>
                    <label>Domicilio</label><em style={{color: "red"}}>*</em><br/>
                    <input type="text" name="domicilio" value={input.domicilio} onChange={onChange} placeholder="Domicilio..."/><br/>
                    {input.domicilio.length < 4 && <p>Este campo no puede estar vacio</p>}
                    <label>Telefono de Contacto </label><br/>
                    <input type="text" name="telefono" value={input.telefono} onChange={onChange} placeholder="telefono..."/><br/>
                </div>
                <div>
                    {items.products.map(product => (
                        <div>
                            <p>{product.name}</p>
                            <p>{product.order.price}</p>
                            <p>{product.order.quantity}</p>
                        </div>
                    ))}
                    <p>${price}</p>
                </div>
            </div>
            <div>
                <button onClick={() => console.log(input)}>Confirmar compra</button>
                <button onClick={() => console.log(input)}>Seguir comprando</button>
            </div>
        </div>
    )
}