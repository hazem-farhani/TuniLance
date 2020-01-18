module.exports = (sequelize, DataTypes) => {
    return sequelize.define('skills', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING,
        },
        userId:{
            type:DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },{timestamps:false})
}