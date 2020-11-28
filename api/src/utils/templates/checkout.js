module.exports = function ( data) {
    let array = []
    for(let i = 0; i < data.order.products.length; i++){
        array.push(`<li style="display: inline-block; color: #282C34"; text-decoration: none">${data.order.products[i].name}</li>`)
    }
    return `<div>
            <h2 style="text-align:center; color: #282C34">${data.order.user.name}</h2>
            <p style="color: #282C34">Su orden ha sido procesada, a continuación un breve resumen de su compra.</p>
            <ul>
                ${array}
            </ul>
            <p style="color: #282C34">Con un valor total de <b>$${data.price} USD</b></p>
            <p style="color: #282C34">Gracias por su compra!!</p>
            <p style="text-align:center; color: #282C34">Para ver mas productos <a href="https://ecommerce-ft06-g08.herokuapp.com/" target="_BLANK">Ingrese Aqui</a></p>
        </div>`
}