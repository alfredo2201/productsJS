import { Sequelize } from "sequelize";

export const sequelize =  new Sequelize({
    database: "store",
    host:'127.0.0.1',
    username: "root", 
    password: "1602",
    dialect: "mysql"
});



