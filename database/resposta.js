const sequelize = require('sequelize');
const connection = require('./database');

const respostas = connection.define('respostas', {
    id_pergunta: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    id_pessoa: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    resposta: {
        type: sequelize.STRING,
        allowNull: false
    }
});

respostas.sync({force: false}).then(() => {
    console.log('Tabela de respostas criada com sucesso');
});

module.exports = respostas;