const sequelize = require('sequelize');
const connection = require('./database');

const pessoas = connection.define('pessoas', {
    nome: {
        type: sequelize.STRING,
        allowNull: false, 
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: sequelize.STRING,
        allowNull: false
    }
});

pessoas.sync({force: false}).then(() => {
    console.log('Tabelas de pessoas criada com sucesso!');
});

module.exports = pessoas;