const Sequelize=require( "sequelize");
const dotenv =require( "dotenv");
dotenv.config();


const db = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: 'localhost'||process.env.HOST,
    dialect: 'postgres' ,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
});

module.exports = db;