module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('services', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        photo: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        timeRequired: { //In seconds?
            type: DataTypes.STRING
        },
        price: {  //In dollars?
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER
        },
        userId:{
            type:DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        categoryId:{
            type:DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'id'
            }
        }
    },{timestamps:false});

    Service.associate=function(db){
        db.Services.hasMany(db.Comments,{
            foreignKey:'serviceId',
            as:'comments'
        });

        db.Services.hasMany(db.Orders,{
            foreignKey:'serviceId',
            as:'orders'
        })
    }

    return Service;
}
