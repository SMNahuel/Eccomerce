import React from 'react';
import s from './TableCategory.module.css';
import RowCategory from './row category/RowCategory'


export default function TableCategory({categories, onEdit, onDelete}){
    return (
        <div className={s.container_table_category}>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {categories &&
                        categories.map(category => 
                            <RowCategory 
                                category={category} 
                                key={category.id} 
                                onEdit={onEdit} 
                                onDelete={onDelete}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
