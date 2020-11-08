const { Product, Category, Image } = require('./src/db.js');

const categories = ["Css", "Html", "JavaScript", "Python", "Java", "React", "Angular", "Ruby"];

module.exports = ()=> {
    // hardcodeamos algunos datos para trabajar en modo dev
    var p = Category.create({
        name: categories[0],
        description: "Cursos de " + categories[0]
    });

    for (let i = 1; i < categories.length; i++) {
        p = p.then(() => Category.create({
            name: categories[i],
            description: "Cursos de " + categories[i]
        }));
    };

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