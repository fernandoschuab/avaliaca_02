const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

sequelize.authenticate().then(() => {
    console.log('Conexão com banco de dados estabelecida com sucesso.');
}).catch((error) => {
    console.error('Erro ao se conectar ao banco de dados: ', error);
});

module.exports = sequelize;
