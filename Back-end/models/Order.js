module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        deadline: {
            type:DataTypes.STRING,
        },
        userId:{
            type:DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        serviceId:{
            type:DataTypes.INTEGER,
            references: {
                model: 'services',
                key: 'id'
            }
        },
        freelancerId:{
            type:DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }

    },{timestamps:false});
    
    return Order;
}