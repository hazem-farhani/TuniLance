module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('categories', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type:DataTypes.STRING,
        }
    },{timestamps:false});


    Category.associate=function(db){
        db.Categories.hasMany(db.Services,{
            foreignKey:'categoryId',
            as:'services'
        })
    }
    
    return Category;
}