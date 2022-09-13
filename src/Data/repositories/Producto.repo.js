import { validateType } from "../../../validaciones.js";
import { getConection } from "../connection.js";

const registerProduct = (value) => {
  if (value === null) {
    return new Error("Parameter without value");
  }
  if (!validateType(value, "object")) {
    return new Error("Invalid type");
  }
  const connection = getConection();
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.log(err);
        reject("Error connecting to database");
      }
      const sqlCode = `INSERT INTO products(product_id, name, price, stock, lastSupplyDate) VALUES('${
        value.id
      }','${value.name}',${value.price},${value.stock},'${value.lastSupplyDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}')`;
      connection.query(sqlCode, (err) => {
        if (err) {
          reject("Error sql code");
        }
        resolve("Product added");
      });
      connection.end();
    });
  });
};

/**
 * Funcion que busca un producto con el id dado en el parametro
 * y lo actualiza en el array
 * @param {*} value
 */
const updateProduct = (value) => {
  if (value === null) {
    return new Error("Parameter without value");
  }
  if (!validateType(value, "object")) {
    return new Error("invalid type");
  }
  const connection = getConection();
  const sqlCode = `UPDATE products SET 
  name ='${value.name}',
  price =${value.price}, 
  stock =${value.stock},
  lastSupplyDate = '${value.lastSupplyDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")} ' 
    WHERE product_id = '${value.id}'`;
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.log(err);
        reject("Error connecting to database");
      }
      connection.query(sqlCode, (err, result) => {
        if (err) {
          console.log(err);
          reject("Failed to update the product");
        }
        resolve(result);
      });
      connection.end();
    });
  });
};

/**
 * Funcion que elimina un producto del arrat de productos, dado por el id
 * del parametro
 * @param {*} value
 */
const deleteProduct = (value) => {
  if (value === null) {
    return new Error("Parameter without value");
  }
  if (!validateType(value, "string")) {
    return new Error("Invalid type");
  }
  const connection = getConection();
  const sqlCode = `DELETE FROM products WHERE product_id = '${value}'`;
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.log(err);
        reject("Error connecting to database");
      }
      connection.query(sqlCode, (err, result) => {
        if (err) {
          console.log(err);
          reject("Failed to remove product");
        }
        resolve(result);
      });
      connection.end();
    });
  });
};
/**
 * Funcion que regresa el valor del producto dentro del array
 * segun el id dado por el parametro
 * @param {*} value
 * @returns un Producto en caso de que lo encuentre dentro del array
 */
const getProduct = (value) => {
  if (value === null) {
    return new Error("Parameter without value");
  }
  if (!validateType(value, "string")) {
    return new Error("Invalid type");
  }
  const connection = getConection();
  const sqlCode = `SELECT * FROM products WHERE product_id = '${value}'`;
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.log(err);
        reject("Error connecting to database");
      }
      connection.query(sqlCode, (err, result) => {
        if (err) {
          console.log(err);
          reject("Error getting the product");
        }
        console.log(result)
        resolve(result);
      });
      connection.end();
    });
  });
};
/**
 * Funcion que regresa todos los valores del array de productos
 * @returns arrat de productos
 */
const getAll = () => {
  const connection = getConection();
  const sqlCode = `SELECT * FROM products`;
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.log(err);
        reject("Error connecting to database");
      }
      connection.query(sqlCode, (err, result) => {
        if (err) {
          console.log(err);
          reject("Error getting products");
        }
        resolve(result);
      });
      connection.end();
    });
  });
};

export { registerProduct, deleteProduct, getProduct, getAll, updateProduct };
