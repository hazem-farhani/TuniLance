module.exports = (sequelize, DataTypes) => {
    return sequelize.define('skill', {
        name: {
            type: DataTypes.STRING,
            PrimaryKey: true,
        }
    })
}