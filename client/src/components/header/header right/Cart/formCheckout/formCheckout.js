import React, { useState } from 'react'
import ProductCart from './ProductCart/productCart'
import s from './formCheckout.module.css'
// import { paises, provincias } from '../../../../../utils/selectForm'
import { useDispatch } from 'react-redux';
import api from '../../../../../redux/action-creators'
import PayPal from './paypal/PayPal'

export default function FormCheckout({items, price, user, onBack}){
    const [input, setInput] = useState({
    //     pais: user.pais === null ? "Argentina" : 
    //         paises.includes(user.pais) ? user.pais : "otro",
    //     otroPais: "" ,
    //     provincia: user.provincia || "",
    //     otraProvincia: "",
    //     localidad: user.localidad || "",
    //     codigoPostal: user.codigoPostal || "",
    //     calle: user.calle || "",
    //     num: user.num || "",
    //     departamento: user.departamento || "",
    //     telefono: user.telefono || "",
         email: user.email
    })
    const [ checkout, setCheckout ] = useState(false)
    // const [error, setError] = useState({})
    const dispatch = useDispatch()
    
    //valido los campos
    // const validate = (input) => {
    //     error.localidad = ""
    //     error.calle = ""
    //     error.num = ""
    //     error.email = ""

    //     if(!input.localidad) error.localidad = "Es necesaria una localidad"
    //     else if(input.localidad.length < 5) error.localidad = "La localidad es invalida"

    //     if(!input.calle) error.calle = "Es necesaria una calle"
    //     else if(input.calle.length < 4) error.calle = "La calle es invalida"

    //     if(!input.num) error.num = "Es necesario un número"
    //     else if(isNaN(Number(input.num)))error.num = "Solo se permiten números"

    //     if(!input.email) error.email = "Es necesario un email"
    //     else if(!/\S+@\S+\.\S+/.test(input.email)) error.email = "El email es invalido"

    //     return error
    // }

    //seteo el imput y los errores cada vez que hay un cambio
    // const onChange = function (e){
    //     setInput({
    //         ...input,
    //         [e.target.name]: e.target.value
    //     })
    //     setError(validate({
    //         ...input,
    //         [e.target.name]: e.target.value
    //     }))
    // }

    //si hay algun error no lo dejo seguirr con la compra
    const onBuy = () => {
    //     for(const key in error){
    //         if(error[key])return alert(error[key])
    //     }
    //     var changes = {}
    //     for(const key in input){
    //         if(input[key] && input[key] !== user[key]) {
    //             changes[key] = input[key]
    //         }
    //     }
    //     if(changes.email) delete changes.email
    //     dispatch(api.updateChanges(changes))
        dispatch(api.confirmCart({items, email: input.email}))
        onBack()
    }
    
    //valido los campos al entrar al formulario
    //validate(input)

    return(
        <>
            { !checkout ?

                <div className={s.container}>
                    <div className={s.text1}>
                        <label>TU COMPRA SERA ENVIADA AL SIGUIENTE EMAIL:<br/>{input.email}</label>
                    </div>
                    <div>
                        <div className={s.text}>
                            TU COMPRA:
                        </div>
                        <div className={s.products}>
                            {items.products.map(product => (
                                <ProductCart key={product.id} product={product} />
                            ))}
                            <div className={s.total}>
                                <p>Total</p>
                                <p>${price}</p>
                            </div>
                        </div>
                        <div className={s.pago}>
                            <h2>Metodo de pago</h2>
                            <img src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg" alt="PayPal"/>
                        </div>
                    </div>
                    <div>
                        <div className={s.container_buttons}>
                            <input type="button" onClick={() => setCheckout(!checkout) } value="Confirmar compra!" />
                            {/* <input type="button" onClick={() => { onBuy(); setCheckout(!checkout) }} value="Confirmar compra!" /> */}
                            <input type="button" onClick={() => onBack()} value="Seguir comprando" />
                        </div>
                    </div>
                </div>
                /*<div >
                    <div className={s.container}>
                <div className={s.form}>*/
                            /* <p style={{ color: "grey", textAlign: "center" }}>los campos con <em style={{ color: "red" }}>* </em> son obligatorios</p><br />
                            <div className={s.container_pais_provincia}>
                                <div className={s.input_pais}>
                                    <label className={s.label_pais}>País<em style={{ color: "red" }}>* </em></label>
                                    <select name="pais" value={input.pais} onChange={onChange}>
                                        {paises && paises.map(pais => (
                                            <option key={pais} value={pais}>{pais}</option>
                                        ))}
                                        <option value="otro">Otro</option>
                                    </select>
                                    {input.pais === "otro" &&
                                        <input type="text" name="otroPais" value={input.otroPais} onChange={onChange} placeholder="p.ej.:Estados Unidos" />
                                    }
                                </div>
                                <br />
                                <div className={s.input_provincia}>
                                    <label>Provincia<em style={{ color: "red" }}>* </em></label>
                                    {!!provincias[input.pais] &&
                                        <select name="provincia" value={input.provincia} onChange={onChange}>
                                            {
                                                provincias[input.pais].map(prov => (
                                                    <option key={prov} value={prov}>{prov}</option>
                                                ))
                                            }
                                        </select>
                                    }
                                    {input.pais === "otro" &&
                                        <input type="text" name="otraProvincia" value={input.otraProvincia} onChange={onChange} placeholder="p.ej.:Springfield" />
                                    }
                                </div>
                                <br />
                            </div>
                            <label>Localidad<em style={{ color: "red" }}>* </em></label>
                            <input type="text" name="localidad" value={input.localidad} onChange={onChange} placeholder="p.ej.:Avellaneda" />
                            <br />
                            <label>Código postal</label>
                            <input type="text" name="codigoPostal" value={input.codigoPostal} onChange={onChange} placeholder="p.ej.:1870" />
                            <br />
                            <div className={s.container_num_calle}>
                                <div className={s.container_calle}>
                                    <label>Calle<em style={{ color: "red" }}>*</em></label>
                                    <input type="text" name="calle" value={input.calle} onChange={onChange} placeholder="p.ej.:Calle Falsa" className={s.input_calle} />
                                </div>
                                <div className={s.container_num}>
                                    <label>Número<em style={{ color: "red" }}>*</em></label>
                                    <input type="text" name="num" value={input.num} onChange={onChange} placeholder="p.ej.:123" className={s.input_num} />
                                </div>
                            </div>
                            <br />
                            <label>Departamento</label>
                            <input type="text" name="departamento" value={input.departamento} onChange={onChange} placeholder="p.ej.:2°" />
                            <br />
                            <label>Teléfono de Contacto </label>
                            <input type="text" name="telefono" value={input.telefono} onChange={onChange} placeholder="p.ej.:1156426413" />
                            <br /> 
                            {/* <label>TU COMPRA SERA ENVIADA AL SIGUIENTE EMAIL: {input.email}</label> */
                        /* </div>
                        <div className={s.container_products_pago}>
                            <div className={s.products}>
                                {items.products.map(product => (
                                    <ProductCart key={product.id} product={product} />
                                ))}
                                <div className={s.total}>
                                    <p>Total</p>
                                    <p>${price}</p>
                                </div>
                            </div>
                            <div className={s.pago}>
                                <h2>Metodo de pago</h2>
                                <img src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg" alt="PayPal"/>
                            </div>
                        </div> */
                    /* </div>
                    <div className={s.container_buttons}>
                        <input type="button" onClick={() => setCheckout(!checkout) } value="Confirmar compra!" /> */
                        /* <input type="button" onClick={() => { onBuy(); setCheckout(!checkout) }} value="Confirmar compra!" /> */
                        /* <input type="button" onClick={() => onBack()} value="Seguir comprando" />
                    </div>
                </div> */
                : <PayPal setCheckout={setCheckout} user={user} checkout={checkout} price={price} onBuy={onBuy}/>}
        </>
    )
}