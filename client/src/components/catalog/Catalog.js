import React, { useState } from 'react';
import AppsIcon from '@material-ui/icons/Apps';

function Catalog (){

    const [ catalog, setCatalog ] = useState(false);

    const toogle = e =>{
        e.preventDefault();
        setCatalog(!catalog);
    }
    return (
        <div>
            <button onClick={toggle}>
                <AppsIcon/>
            </button>

        </div>
    )
}
export default Catalog;