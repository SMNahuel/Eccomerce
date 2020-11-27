module.exports = function ({name, key}) {
    return `
        <h1>Hola ${name}</h1>
        <span>Se a solicitado un cambio de password con tu email</span>
        <span>haz click en el boton de abajo para resetarla</span>
        <form action="${process.env.FRONT_URL}/password/${key}" method="get" style="align-self:center;">
            <input type="submit" value="Resetear Password" style="height:50px;width:200px;font-size:large;">
        </form>
        <span>Si tu no solicitaste un cambio de contraseña, por favor ignora este email y tu contraseña se mantendra intacta</span>
        <span>Este cambio de contraseña solo estara disponible por un periodo de 30dias</span>
        <span>Gracias y disculpa las molestias</span>
        <p style="align-self:center;">Wultur.company</p>
        `;
};