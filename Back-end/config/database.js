const Sequelize = require('sequelize');
const ServiceModel = require('../models/Service');
const CategoryModel = require('../models/Category');
const CommentModel = require('../models/Comment');
const SkillModel = require('../models/Skill');
const UserModel = require('../models/User');
//Connect to mysql db
const sequelize = new Sequelize('tunilance','root','', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
});

//Test db connection
sequelize.authenticate()
    .then(() => console.log('Connection to database established successfully'))
    .catch(err => console.log(err));

//Create Db and tables  OR  Sync db with model
sequelize.sync({ force: false, alter: true})
    .then(() => {
        console.log('Database and Tables Synched');
});

var db={}
db.Sequelize=Sequelize;
db.sequelize=sequelize;
//creating models and putting them in db object 
const Services = ServiceModel(sequelize, Sequelize.DataTypes);
const Categories = CategoryModel(sequelize, Sequelize.DataTypes);
const Comments = CommentModel(sequelize, Sequelize.DataTypes);
const Skills = SkillModel(sequelize, Sequelize.DataTypes);
const Users = UserModel(sequelize, Sequelize.DataTypes);
db.Users=Users;
db.Services=Services;
db.Categories=Categories;
db.Comments=Comments;
db.Skills=Skills;
module.exports=db;



