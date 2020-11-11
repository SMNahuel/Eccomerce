export function validateCategory({name, description}){
    let err = {}
    if (!name || !name.length){
        err.name = 'el nombre no debe estar vacio'
    }
    if (!description || !description.length){
        err.description = 'la descripcion no debe estar vacia'
    }
    return err
}

export function validateProduct({name, description, price, stock}){
    let err = {}
    if (!name || !name.length){
        err.name = 'el nombre no debe estar vacio'
    }
    if (!description || !description.length){
        err.description = 'la descripcion no debe estar vacia'
    }
    if (!price){
        err.price = 'el producto debe tener un precio'
    } else if (!Number(price)){
        err.price = 'el precio debe ser un numero'
    }
    if (!stock){
        err.stock = 'el producto debe tener un stock'
    } else if (!Number(stock)){
        err.stock = 'el stock debe ser un numero'
    }
    return err
}