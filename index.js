import * as ProductoController from "./src/controller/Producto.controller.js";
import { question } from "readline-sync";
import { validateNumber, validateType } from "./validaciones.js";

/**
 * Funcion que genera el menu de opciones de producto
 * en la consola
 * @returns
 */
const menu = () => {
  console.log("------ Menu ------");
  console.log(
    "1.Register product.\n2.Update producto.\n3.Delete Product.\n4.Get Product by Code\n5.Get all products\n6.Exit"
  );
  let read = question("Enter an option: ");
  if (read === "undefined" || !validateNumber(read)) {
    console.log("Invalid value entered");
    return -1;
  }
  if (read <= 0 && read >= 5) {
    console.log("Invalid value entered");
    return -1;
  }
  return parseInt(read);
};

/**
 * Funcion principal que llama a la funcion de menu
 * y ejecuta la respuesta dada por el usuario desde la consola
 */
const main = async () => {
  let sigo = true;
  let resp;
  while (sigo) {
    let option = menu();
    switch (option) {
      case -1:
        menu();
        break;
      case 1:
        let productToAdd = registerProduct();
        resp = await ProductoController.register(productToAdd);
        console.log(resp);
        break;
      case 2:
        let productToUpdate = await updateProduct();
        resp = await ProductoController.update(productToUpdate);
        console.log(resp);
        break;
      case 3:
        let productToDelete = deleteAndGetProduct();
        resp = await ProductoController.deleteProduct(productToDelete);
        console.log(resp);
        break;
      case 4:
        let productToObtain = deleteAndGetProduct();
        resp = await ProductoController.getProduct(productToObtain);
        console.log(resp);
        break;
      case 5:
        resp = await ProductoController.getAll();
        for (let i = 0; i < resp.length; i++) {
          console.log(resp[i]);
        }
        break;
      case 6:
        sigo = false;
    }
  }
};
/**
 * Funcion que muestra en consola los valores a 
 * ingresar para registrar un producto
 * @returns 
 */
const registerProduct = () => {
  let id;
  let name;
  let price;
  let stock;
  let lastSupplyDate = null;
  while (true) {
    id = question("Enter the code:");
    if (!validateType(id, "string")) {
      console.error(
        "Invalid value entered. Try again\n----------------------------"
      );
      continue;
    }
    name = question("Name:");
    if (validateNumber(name)) {
      console.error(
        "Invalid value entered. Try again\n----------------------------"
      );
      continue;
    }
    price = question("Price:");
    if (!validateNumber(price)) {
      console.error(
        "Invalid value entered. Try again\n----------------------------"
      );
      continue;
    }
    stock = question("Stock:");
    if (!validateNumber(stock)) {
      console.error(
        "Invalid value entered. Try again\n----------------------------"
      );
      continue;
    }
    lastSupplyDate = Date.now();
    lastSupplyDate = new Date(lastSupplyDate);
    price = parseFloat(price);
    stock = parseInt(stock);
    break;
  }
  return { id, name, price, stock, lastSupplyDate };
};
/**
 * Funcion que pide el id para buscar el producto y
 * luego pedir los demas atributos de producto 
 * para actualizarlos en la base de datos
 * @returns 
 */
const updateProduct = async () => {
  let id
  let name;
  let price;
  let stock;
  let lastSupplyDate = null;
  while (true) {
    id = deleteAndGetProduct();
    let res = await ProductoController.getProduct(id);
    if (res == -1) {
      console.log("Product not found");
      continue;
    }
    name = question("Name:");
    if (validateNumber(name)) {
      console.error(
        "Invalid value entered. Try again\n----------------------------"
      );
      continue;
    }
    price = question("Price:");
    if (!validateNumber(price)) {
      console.error(
        "Invalid value entered. Try again\n----------------------------"
      );
      continue;
    }
    stock = question("Stock:");
    if (!validateNumber(stock)) {
      console.error(
        "Invalid value entered. Try again\n----------------------------"
      );
      continue;
    }
    lastSupplyDate = Date.now();
    lastSupplyDate = new Date(lastSupplyDate);
    price = parseFloat(price);
    stock = parseInt(stock);
    break;
  }
  return { id, name, price, stock, lastSupplyDate };
};
/**
 * Funcion que solicita el id para eliminar u obtener algun
 * producto de la base de datos.
 * @returns 
 */
const deleteAndGetProduct = () => {
  let id;
  while (true) {
    id = question("Enter the code:");
    if (!validateType(id, "string")) {
      console.error(
        "Invalid value entered. Try again\n----------------------------"
      );
      continue;
    }
    return id;
  }
};

// Ejecución de la funcion principal.
main();
