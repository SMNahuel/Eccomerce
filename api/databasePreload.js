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
    .then(r => 
        console.log('categories pre-charged')
    )
}