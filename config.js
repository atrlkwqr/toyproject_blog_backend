import mysql from 'promise-mysql';
import "./env";

const dbConfig = {
  host: 'localhost',
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export default mysql.createPool(dbConfig);