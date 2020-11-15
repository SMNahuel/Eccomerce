import React from 'react';
import s from './TableCategory.module.css';
import RowCategory from './RowCategory/RowCategory'


export default function TableCategory({categories, onEdit, onDelete}){
    return (
        <div className={s.container_table_category}>
            <table>
                <thead className={s.container_thead}>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th className={s.description}>Descripcion</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {categories &&
                        categories.map(category => 
                            <RowCategory
                                key={category.id}
                                category={category}
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
