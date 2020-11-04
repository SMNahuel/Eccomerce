import React from 'react';
//Declaramos componente Product como función con ES6
const Product = (props) => {
    return(
        <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.product.length > 0 ? (
            props.product.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button 
     
                    onClick = {()=>{props.editRow(product)}}>
                    Edit
                  </button>
                  <button 
                    className="button muted-button"
                    onClick={() => {props.deletedProduct(product.id)}}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) 
            ) : (
              <tr>
                <td colSpan={3}>No users</td>
              </tr>
            )}
    
        </tbody>
      </table>)
}
export default Product;
//Este un componente presentacional 
//Componentes Presentacionales
//Los componentes presentacionales son componentes stateles, 
//y su comportamiento corresponde al de las funciones puras, 
//es decir, dado argumentos X, este siempre entregará una respuesta Y. 
//Esto mismo se puede traducir en términos de React de la siguiente forma:
//Fuente: https://medium.com/@pabloulloacastro/react-descubriendo-componentes-c158959116fe#:~:text=Los%20componentes%20presentacionales%20son%20componentes,siempre%20entregar%C3%A1%20una%20respuesta%20Y.