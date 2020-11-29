module.exports = function ({name, key}) {
    return `<div>
            <h2 style="color: #282C34; text-align: center;">Hola ${name}</h2>
            <p style="color: #282C34">Se a solicitado un cambio de password con tu email. Haz click en el boton de abajo para resetarla</p>
            <form action="${process.env.FRONT_URL}/password/${key}" method="get" style="margin: 10px 0px">
                <input type="submit" value="Resetear Password" style="height:30px;width:200px;font-size:16px;color: #282C34;">
            </form>
            <p style="color: #282C34">Este cambio de contraseña solo estara disponible por un periodo de 30 dias</p>
            <p style="color: #282C34">Si tu no solicitaste un cambio de contraseña, por favor ignora este email y tu contraseña se mantendra intacta</p>
            <p style="color: #282C34">Gracias y disculpa las molestias</p>
            <p style="text-align: end; color: #282C34">Wultur.company</p>
        </div>
        `;
};