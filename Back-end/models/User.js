var bcrypt = require('bcrypt-nodejs');

module.exports=(sequelize,DataTypes)=>{
const User = sequelize.define('users', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email: {
        type: DataTypes.STRING,
        
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    dateOfBirth: {
        type: DataTypes.STRING
    },
    phoneNumber: {
        type: DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING
    }
    
})

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
 };

return User;
};


