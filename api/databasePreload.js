const cart = require('./src/controllers/cart.js');
const { Product, Category, Image, User, Rol, Review, Comment, Respond } = require('./src/db.js');

const categories = ["React", "Angular", "Ruby", "Python", "Java", "JavaScript", "Css", "Html"];
const roles = ['banned','anonymous','guest','admin','owner']
const users = [
    { rolId: 5, password: "1234567", imageId: categories.length + 1, name: "Maico Loncomilla", email: "maicoloncomilla@gmail.com" },
    { rolId: 5, password: "1234567", imageId: categories.length + 2, name: "Javier Balonga", email: "javierbalonga@gmail.com" },
    { rolId: 5, password: "1234567", imageId: categories.length + 3, name: "Esteban Céspedes", email: "ces.esteban@gmail.com" },
    { rolId: 5, password: "1234567", imageId: categories.length + 4, name: "Nahuel Sanchez", email: "nahuelsan96@gmail.com" },
    { rolId: 5, password: "1234567", imageId: categories.length + 5, name: "Ignacio Gimenez", email: "ignaciogimenez70@gmail.com"},
    { rolId: 5, password: "1234567", imageId: categories.length + 6, name: "Leonardo Vinas", email: "vinasleonardo@yahoo.com" }
]
const lorem = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
const romanNumbers = ['I','II','III','IV','V']

const randomNumber = (min, max) => (Math.random() * (max - min) + (min + 0.5)) | 0
const randomMessage = (val) => lorem.slice(0, (Math.random() * (val-1) + 1.5) | 0)

var p = new Promise(resolve => resolve(true))

const log = (str) => {
    p = p.then(r => (
        console.log(str)
    ))
}

const createRoles = () => {
    roles.forEach(rol => (
        p = p.then(() => (
            Rol.create({name: rol})
        ))
    ))
}

const createUsers = () => {
    users.forEach(user => (
        p = p.then(() => (
            User.create(user)
        ))
    ))
}

const createCategories = () => {
    categories.forEach(category => (
        p = p.then(() => (
            Category.create({
                name: category,
                description: "Cursos de " + category
            })
        ))
    ))
}

const createImages = () => {
    categories.forEach(category => (
        p = p.then(() => (
            Image.create({fileName: category + '.png'}))
        )
    ))
}

const createProfileImages = () => {
    users.forEach((user, i) => (
        p = p.then(() => (
            Image.create({fileName: i + 1 + '.jpg'}))
        )
    ))
}

const createProducts = () => {
    categories.forEach((category, i) => {
        for (let j = 0; j < 5; j++) {
            p = p.then(() => (
                Product.create({
                    name: category + " " + romanNumbers[j],
                    description: randomMessage(255),
                    price: randomNumber(50, 200),
                    stock:  randomNumber(10, 30)
                })
            ))
            .then( product => {
                product.setCategories([i + 1]);
                return product.setImages([i + 1]);
            })
        }
    })
}

const createCarts = () => {
    users.forEach((user, i) => {
        let userId = i+1
        let productsIds = []
        for (let j = randomNumber(1, 5); j < categories.length * 5; j += randomNumber(1, 5)) {
            productsIds.push(j)
        }
        productsIds.forEach(productId => {
            p = p.then(() => (
                cart.addToCart(userId, {productId: productId, quantity: 1})
            ))
        })
        p = p.then(c => cart.process({id: c.id}))
        productsIds.forEach(productId => {
            p = p.then(() => Review.create({
                qualification: randomNumber(1, 5),
                message: randomMessage(255),
                userId: userId,
                productId: productId
            }))
        })
    })
}

const createComments = () => {
    users.forEach((user, i) => {
        let userId = i+1
        let productsIds = []
        for (let j = randomNumber(1, 3); j < categories.length * 5; j += randomNumber(1, 3)) {
            productsIds.push(j)
        }
        productsIds.forEach(productId => {
            p = p.then(()=>Comment.create({
                userId, 
                productId,
                message: randomMessage(255)
            }))
            .then(comment => {
                let numberTimes = randomNumber(0, 4)
                for(let j = 0; j < numberTimes; j++) {
                    Respond.create({
                        commentId: comment.id,
                        userId: randomNumber(1, 6),
                        message: randomMessage(255)
                    })
                }
            })
        })
    })
}

module.exports = ()=> {
    createImages()
    log('images pre-charged')
    createProfileImages()
    log('profile images pre-charged')
    createRoles()
    log('Rols pre-charged')
    createUsers()
    log('users pre-charged')
    createCategories()
    log('categories pre-charged')
    createProducts()
    log('products pre-charged')
    createCarts()
    log('carts and reviews pre-charged')
    createComments()
    log('comments pre-charged')
    log('all preload completed')
}


