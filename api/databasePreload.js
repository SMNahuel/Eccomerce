const { Product, Category } = require('./src/db.js');

const categories = ["Css", "Html", "JavaScript", "Python", "Java", "React", "Angular", "Ruby"];

module.exports = ()=> {
    // hardcodeamos algunos datos para trabajar en modo dev
    Promise.all(
        categories.map(category => 
            Category.create({
                name: category,
                description: "Cursos de " + category
            })
        )
    )
    .then(r => console.log('categories pre-charged'))
    .then(()=>
        Promise.all(
            categories.map((category, index) => 
                Product.create({
                    name: category + " I",
                    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi',
                    price: 100,
                    stock: 20
                })
                .then(product => product.setCategories([index + 1]))
                .then(res => 
                    Product.create({
                        name: category + " II",
                        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi',
                        price: 120,
                        stock: 20
                    })
                )
                .then(product => product.setCategories([index + 1]))
                .then(res => 
                    Product.create({
                        name: category + " III",
                        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi',
                        price: 140,
                        stock: 20
                    })
                )
                .then(product => product.setCategories([index + 1]))
                .then(res => 
                    Product.create({
                        name: category + " IV",
                        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi',
                        price: 160,
                        stock: 20
                    })
                )
                .then(product => product.setCategories([index + 1]))
                .then(res => 
                    Product.create({
                        name: category + " V",
                        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit conubia ornare mi faucibus, hac gravida quisque dignissim ridiculus proin himenaeos diam et. Nullam risus gravida praesent eu nulla platea per lacinia netus, volutpat facilisis ut ultricies turpi',
                        price: 180,
                        stock: 20
                    })
                )
                .then(product => product.setCategories([index + 1]))
            )
        )
    )
    .then(r => console.log('products pre-charged'))
}