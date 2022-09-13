import * as serviceProduct from "../Services/Producto.service.js"

/**
 * Función que llama al servicio que agrega el producto a la
 * base de datos
 * @returns
 */
const register = async (values) => {
  if(typeof values === undefined || values === null) {
    return 
  }
  const res = await serviceProduct.registerProduct(values);
  return res;
};
/**
 * Funcion que llama al servicio que actualiza los valores
 * de un producto en la base de datos
 * @returns
 */
const update = async (values) => {
  if(typeof values === undefined || values === null) {
    return 
  }
  let res = await serviceProduct.updateProduct(values);
  return res
};

/**
 * Funcion que llama al servicio que elimina a un producto
 * de la base de datos
 * @returns
 */
const deleteProduct = async (value) => {
  if(typeof value === undefined || value === null) {
    return 
  }
  return await serviceProduct.deleteProduct(value);
};

/**
 * Funcion que llama al servicio que obtiene
 * el producto dado por el valor del parametro (code)
 * de la base de datos
 * @returns
 */
const getProduct = async (value) => { 
  if(typeof value === undefined || value === null) {
    return 
  } 
  let res = await serviceProduct.getProduct(value);
  return res
};

/**
 * Funcion que llama al servicio que obtiene todos los productos
 */
const getAll = async () => {
  return await serviceProduct.getAllProducts();
};

export { register, update, deleteProduct, getAll, getProduct };
