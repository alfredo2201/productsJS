import { validateType } from "../../../validaciones.js";
// import { getConection } from "../native.connection.js";
import { Product } from "../../models/Product.js";
import { Op } from "sequelize";

const registerProduct = (value) => {
  if (value === null) {
    return new Error("Parameter without value");
  }
  if (!validateType(value, "object")) {
    return new Error("Invalid type");
  }
  return new Promise(async (resolve, reject) => {
    const product = Product.build({
      id: value.id,
      name: value.name,
      price: value.price,
      stock: value.stock,
      lastSupplyDate: value.lastSupplyDate,
    });
    await product
      .save()
      .then(() => resolve("Product successfully created"))
      .catch(() => resolve("Product failed to be created"));
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
    return new Error("Invalid type");
  }
  return new Promise(async (resolve, reject) => {
    await Product.update({
        name: value.name,
        price: value.price,
        stock: value.stock,
        lastSupplyDate: value.lastSupplyDate,
      }, {
        where: { id: value.id}
      })
      .then(() => resolve("Product successfully updated"))
      .catch(() => resolve("Product failed to be updated"));
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
  return new Promise(async (resolve, reject) => {
    await Product.destroy({
      where: { id: value },
    })
      .then(() => resolve("Product successfully deleted"))
      .catch(() => resolve("Product failed to be deleted"));
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
  return new Promise((resolve, reject) => {
    const products = Product.findAll({
      where: {
        id: {
          [Op.eq]: value,
        },
      },
    });
    if (products.length === 0) {
      reject("Product not found");
    } else {
      resolve(products);
    }
  });
};
/**
 * Funcion que regresa todos los valores del array de productos
 * @returns arrat de productos
 */
const getAll = () => {
  return new Promise((resolve, reject) => {
    const products = Product.findAll();
    if (products.length === 0) {
      reject("Product not found");
    } else {
      resolve(products);
    }
  });
};

export { registerProduct, deleteProduct, getProduct, getAll, updateProduct };
