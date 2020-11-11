const { Product, Category, Image, User } = require('./src/db.js');

const categories = ["Css", "Html", "JavaScript", "Python", "Java", "React", "Angular", "Ruby"];
const user = [
    {
        name: "Maico Loncomilla",
        email: "maicoloncomilla@gmail.com",
        password: "1234"
    },
    {
        name: "Javier Balonga",
        email: "javierbalonga@gmail.com",
        password: "2345"
    },
    {
        name: "Esteban",
        email: "ces.esteban@gmail.com",
        password: "567"
    },
    {
        name: "Leo Vinas",
        email: "vinasleonardo@yahoo.com",
        password: "783"
    },
    {
        name: "Nahuel Sanches",
        email: "nahuelsan96@gmail.com",
        password: "789"
    },
    {
        name: "Nacho",
        email: "ignaciogimenez70@gmail.com",
        password: "1234"
    }

]

module.exports = ()=> {
    // hardcodeamos algunos datos para trabajar en modo dev
    var p = Category.create({
        name: categories[0],
        description: "Cursos de " + categories[0]
    });
    var z = User.create({
        name: user[0].name,
        email: user[0].email,
        password: user[0].password
    })

    for (let i = 1; i < categories.length; i++) {
        p = p.then(() => Category.create({
            name: categories[i],
            description: "Cursos de " + categories[i]
        }));
    };

    for(let i = 1; i < user.length; i++){
        z = z.then(() => User.create({
            name: user[i].name,
            email: user[i].email,
            password: user[i].password
        }))
    }

    p = p.then(r => console.log('categories pre-charged'));

    
    for (let i = 0; i < categories.length; i++) {
        let imageInstance;

        p = p.then(() => Image.findOrCreate({
            where: {
                fileName: categories[i] + '.png'
            }
        }))
        .then(r => imageInstance = r[0])
        .then(() => Product.create({
            name: categories[i] + " I",
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi',
            price: 100,
            stock: 20
        }))
        .then( product => {
            product.setCategories([i + 1]);
            return product.setImages([imageInstance.id]);
        })
        .then(() => Product.create({
            name: categories[i] + " II",
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi',
            price: 120,
            stock: 20
        }))
        .then( product => {
            product.setCategories([i + 1]);
            return product.setImages([imageInstance.id]);
        })
        .then(() => Product.create({
            name: categories[i] + " III",
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi',
            price: 140,
            stock: 20
        }))
        .then( product => {
            product.setCategories([i + 1]);
            return product.setImages([imageInstance.id]);
        })
        .then(() => Product.create({
            name: categories[i] + " IV",
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi',
            price: 160,
            stock: 20
        }))
        .then( product => {
            product.setCategories([i + 1]);
            return product.setImages([imageInstance.id]);
        })
        .then(() => Product.create({
            name: categories[i] + " V",
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi',
            price: 180,
            stock: 20
        }))
        .then( product => {
            product.setCategories([i + 1]);
            return product.setImages([imageInstance.id]);
        })
    };

    p.then(r => console.log('products pre-charged'))
}