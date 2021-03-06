module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        serviceId:{
            type:DataTypes.INTEGER,
            references: {
                model: 'services',
                key: 'id'
            }
        },
        userId:{
            type:DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }

    },{timestamps:false});

    return Comment;
}