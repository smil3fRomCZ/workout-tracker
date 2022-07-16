require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbConfig = {
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
};

const sequelize = new Sequelize(
    dbConfig.DB_NAME,
    dbConfig.DB_USERNAME,
    dbConfig.DB_PASSWORD,
    {
        host: dbConfig.DB_HOST,
        dialect: 'postgres',
        port: dbConfig.DB_PORT,
        logging: false,
    }
);

const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');
    } catch (error) {
        console.log('Database coonection failed', error);
    }
};

module.exports = { sequelize, connectToDb };
