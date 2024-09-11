const sequelize = require('sequelize');

const connection = new sequelize('projetopratico', 'root', 'S3mpher@0102', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;