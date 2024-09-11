const sequelize = require('sequelize');
const connection = require('./database');

const perguntas = connection.define('perguntas', {
    id_pessoa: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.STRING,
        allowNull: false
    }
});

perguntas.sync({force: false}).then(() => {
    console.log('Tabela de perguntas criada com sucesso');
});

module.exports = perguntas;