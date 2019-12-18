const Sequelize = require('sequelize');
const ServiceModel = require('../models/Service');
const CategoryModel = require('../models/Category');
const CommentModel = require('../models/Comment');
const SkillModel = require('../models/Skill');

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
})

//Test db connection
sequelize.authenticate()
    .then(() => console.log('Connection to database established successfully'))
    .catch(err => console.log(err));

//Create Models
const Service = ServiceModel(sequelize, Sequelize.DataTypes);
const Category = CategoryModel(sequelize, Sequelize.DataTypes);
const Comment = CommentModel(sequelize, Sequelize.DataTypes);
const Skill = SkillModel(sequelize, Sequelize.DataTypes);

//Set Relations
Category.hasMany(Service);
Service.hasMany(Comment);

//Create Db and tables  OR  Sync db with model
sequelize.sync({ force: false, alter: true})
    .then(() => {
        console.log('Database and Tables Synched');
    })

module.exports = {
    Service,
    Category,
    Comment,
    Skill,
    sequelize
};