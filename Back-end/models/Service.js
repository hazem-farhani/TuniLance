module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('service', {
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
        }
    });

    return Service;
}
