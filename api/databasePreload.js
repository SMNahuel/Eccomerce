const { Product, Category, Image, User, Rol } = require('./src/db.js');

const roles = ['banned','anonymous','guest','admin','owner']
const users = [
    {
        name: "Maico Loncomilla",
        email: "maicoloncomilla@gmail.com",
        password: "1234567",
        rolId: 5
    },
    {
        name: "Javier Balonga",
        email: "javierbalonga@gmail.com",
        password: "1234567",
        rolId: 5
    },
    {
        name: "Esteban",
        email: "ces.esteban@gmail.com",
        password: "1234567",
        rolId: 5
    },
    {
        name: "Leo Vinas",
        email: "vinasleonardo@yahoo.com",
        password: "1234567",
        rolId: 5
    },
    {
        name: "Nahuel Sanches",
        email: "nahuelsan96@gmail.com",
        password: "1234567",
        rolId: 5
    },
    {
        name: "Nacho",
        email: "ignaciogimenez70@gmail.com",
        password: "1234567",
        rolId: 5
    }
]
const categories = ["Css", "Html", "JavaScript", "Python", "Java", "React", "Angular", "Ruby"];

module.exports = ()=> {
    // hardcodeamos algunos datos para trabajar en modo dev
    var p = new Promise(resolve => resolve(true))

    roles.forEach(rol => p = p.then(() => 
        Rol.create({
            name: rol
        })
    ))

    p = p.then(r => console.log('Rols pre-charged'));

    users.forEach(user => p = p.then(() => 
        User.create(user)
    ))

    p = p.then(r => console.log('users pre-charged'));

    categories.forEach(category =>  p = p.then(() => 
        Category.create({
            name: category,
            description: "Cursos de " + category
        })
    ))

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
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi\n- Build, test, and launch React apps\n- Setup authentication and user accounts\n- Learn the latest React libraries and tools\n- Use cutting-edge ES6/ES7 JavaScrip\n- Deploy your React apps live to the web\n- Master React, Redux, React-Router, and more\n- Become an advanced, confident, and modern JavaScript developer from scratch\n- JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, etc.",
            price: 100,
            stock: 20
        }))
        .then( product => {
            product.setCategories([i + 1]);
            return product.setImages([imageInstance.id]);
        })
        .then(() => Product.create({
            name: categories[i] + " II",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi\n- Build, test, and launch React apps\n- Setup authentication and user accounts\n- Learn the latest React libraries and tools\n- Use cutting-edge ES6/ES7 JavaScrip\n- Deploy your React apps live to the web\n- Master React, Redux, React-Router, and more\n- Become an advanced, confident, and modern JavaScript developer from scratch\n- JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, etc.",
            price: 120,
            stock: 20
        }))
        .then( product => {
            product.setCategories([i + 1]);
            return product.setImages([imageInstance.id]);
        })
        .then(() => Product.create({
            name: categories[i] + " III",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi\n- Build, test, and launch React apps\n- Setup authentication and user accounts\n- Learn the latest React libraries and tools\n- Use cutting-edge ES6/ES7 JavaScrip\n- Deploy your React apps live to the web\n- Master React, Redux, React-Router, and more\n- Become an advanced, confident, and modern JavaScript developer from scratch\n- JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, etc.",
            price: 140,
            stock: 20
        }))
        .then( product => {
            product.setCategories([i + 1]);
            return product.setImages([imageInstance.id]);
        })
        .then(() => Product.create({
            name: categories[i] + " IV",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi\n- Build, test, and launch React apps\n- Setup authentication and user accounts\n- Learn the latest React libraries and tools\n- Use cutting-edge ES6/ES7 JavaScrip\n- Deploy your React apps live to the web\n- Master React, Redux, React-Router, and more\n- Become an advanced, confident, and modern JavaScript developer from scratch\n- JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, etc.",
            price: 160,
            stock: 20
        }))
        .then( product => {
            product.setCategories([i + 1]);
            return product.setImages([imageInstance.id]);
        })
        .then(() => Product.create({
            name: categories[i] + " V",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi\n- Build, test, and launch React apps\n- Setup authentication and user accounts\n- Learn the latest React libraries and tools\n- Use cutting-edge ES6/ES7 JavaScrip\n- Deploy your React apps live to the web\n- Master React, Redux, React-Router, and more\n- Become an advanced, confident, and modern JavaScript developer from scratch\n- JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, etc.",
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