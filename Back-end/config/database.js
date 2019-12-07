const Sequelize = require('sequelize');

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

//Create Db and tables  OR  Apply changes
sequelize.sync({ force: false, alter: true})
    .then(() => {
        console.log('Database and Tables Synched');
    })

module.exports = sequelize;