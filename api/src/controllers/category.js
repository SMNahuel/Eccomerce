const { Category } = require('../db.js');

module.exports = {
    read: function() {
        return Category.findAll({
            attributes: ['id', 'name', 'description'],
            order: ["id"]
        })
    },


    create: function({name, description}) {
        return Category.findOrCreate({
            where: {
                name: name
            },
            defaults: {
                description: description
            }
        })
        .then(() => this.read())
    },


    update: function(id, {description, name}) {
        let atributesToUpdate = {};
        if (description) atributesToUpdate.description = description;
        if (name) atributesToUpdate.name = name;

        return Category.update(
            atributesToUpdate,
            { 
                where: { 
                    id: id 
                } 
            }
        )
        .then(() => this.read())
    },

    
    delete: function(id) {
        return Category.destroy({
            where: {
                id: id
            }
        })
        .then(() => this.read())
    }
}