import React from 'react';
/* import s from './DeleteCategory.module.css'; */

export default function DeleteCategory( { handleDelete, category, onNotSure } ){
    return (
        // estilos contenedor
        <div>
            {/* estilos contenedor items */}
            <div>
                <h3>Seguro que desea eleminar la categoria?</h3>
            </div>
            <div>
                <button onClick={()=>handleDelete(category.id)}>Si</button>
                <button onClick={onNotSure}>No</button>
            </div>
        </div>
    )
}
