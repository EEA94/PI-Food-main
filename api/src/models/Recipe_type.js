const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {

    sequelize.define('Recipe_type', {
        
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
        
    }, {
        timestamps: false 
    })
}
