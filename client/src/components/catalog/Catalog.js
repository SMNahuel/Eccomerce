import React, { useState } from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import CatalogCourse from './course catalog/CatalogCourse';

function Catalog (){

    const [ catalog, setCatalog ] = useState(false);

    const toogle = e =>{
        e.preventDefault();
        setCatalog(!catalog);
    }
    return (
        <div>
            {
                !catalog &&
                <button onClick={toogle}>
                    <AppsIcon />
                </button>
            }

            {
                catalog &&
                <CatalogCourse />
            }

        </div>
    )
}
export default Catalog;