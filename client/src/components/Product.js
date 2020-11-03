//Declaramos componente Product como función con ES6
const Product = ({ titulo, descripcion, precio, cantidad}) => {
    <div>
        <div>{titulo}</div>
        <div><h3>{descripcion}</h3><h4>{precio}</h4><h4>{cantidad}</h4></div>
    </div>
}

//Este un componente presentacional 
//Componentes Presentacionales
//Los componentes presentacionales son componentes stateles, 
//y su comportamiento corresponde al de las funciones puras, 
//es decir, dado argumentos X, este siempre entregará una respuesta Y. 
//Esto mismo se puede traducir en términos de React de la siguiente forma:
//Fuente: https://medium.com/@pabloulloacastro/react-descubriendo-componentes-c158959116fe#:~:text=Los%20componentes%20presentacionales%20son%20componentes,siempre%20entregar%C3%A1%20una%20respuesta%20Y.