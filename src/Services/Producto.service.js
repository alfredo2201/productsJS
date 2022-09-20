import { Producto } from "../models/Producto.js";
import * as repo from "../Data/repositories/Producto.repo.js";

/**
 * Función que registra los producto ingresados por consola
 * @returns
 */
 const registerProduct = async (values) => {
  
    let producto = new Producto(
      values.id,
      values.name,
      values.price,
      values.stock,
      values.lastSupplyDate
    );    
    let resp = await repo.registerProduct(producto).catch(console.log("Error registering product"));    
    return resp
    
  };
  /**
   * Funcion que actualiza un producto, dato por el id ingresado por consola
   * @returns
   */
  const updateProduct = async (values) => {
    let producto = new Producto(
      values.id,
      values.name,
      values.price,
      values.stock,
      values.lastSupplyDate
    );
    let resp = await repo.updateProduct(producto, values.product).catch(console.log("Error updating product"));     
    return resp
  };
  
  /**
   * Funcion que elimina un producto de la lista de productos
   * segun el id del producto
   * @returns
   */
  const deleteProduct = async (value) => {
    return await repo.deleteProduct(value);
  };
  
  /**
   * Funcion que regresa un producto de la lista, dado por el id
   * ingresado en la consola
   * @returns
   */
  const getProduct = async (value) => {  
    let req = await repo.getProduct(value);
    if (req === "Product not found") {
      console.error("Product with code: " + value + " no found");
      return -1;
    }
    return req
  };
  
  /**
   * Funcion que imprime todos los productos de la lista
   */
  const getAllProducts = async () => {
    return await repo.getAll();
  };

  export { registerProduct, updateProduct, deleteProduct, getAllProducts, getProduct };