import { STRING, INTEGER, FLOAT, DATE } from "sequelize";
import {sequelize} from "../Data/sequelize.connection.js"

export const Product = sequelize.define('Product',{
    id: {
       type: STRING(6),
       primaryKey: true 
    },
    name: STRING(45),
    price: FLOAT,
    stock: INTEGER,
    lastSupplyDate: DATE
})

