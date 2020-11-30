module.exports = function ( data ) {
    return `<div>
        <h2 style="color: #282C34; text-align:center;">Estimado ${data.name}</h2>
        <p style="color: #282C34">Su pago ha sido procesado por un total de: <b>$${data.price} USD</b></p>
    </div>`
}