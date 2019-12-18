const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

module.exports = User;
