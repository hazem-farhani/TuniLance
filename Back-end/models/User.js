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
        type: DataTypes.TEXT("long"),
        allowNull: true,
        length:"long",
       },
    freelancer: {
        type: DataTypes.BOOLEAN
    },
    description: {
        type: DataTypes.STRING
    }
    
},{timestamps:false});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
 };

 User.associate=function(db){

     db.Users.hasMany(db.Skills,{
         foreignKey:"userId",
         as:"skills"
     });

     db.Users.hasMany(db.Services,{
         foreignKey:'userId',
         as:'services'
     });

     db.Users.hasMany(db.Comments,{
        foreignKey:'userId',
        as:'comments'
    });

    db.Users.hasMany(db.Orders,{
        foreignKey:'userId',
        as:'orders'
    });
 }

return User;
};


