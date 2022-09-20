import { validateDate, validateType } from "../../validaciones.js";

class Producto {
  constructor(id, name, price, stock, lastSupplyDate) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.lastSupplyDate = lastSupplyDate;
  }

  set id(value) {
    if (!validateType(value, "string")) {
      throw new Error("Valor inválido. Vuelve a intentarlo 1");
    }
    if (value.length != 6) {
      throw new Error("Valor inválido. Vuelve a intentarlo 2");
    }
    this._id = value;
  }

  set name(value) {
    if (!validateType(value, "string")) {
      throw new Error("Valor inválido. Vuelve a intentarlo");
    }
    if (value.length >= 100) {
      throw new Error("Nombre excede el tamaño permitido. Vuelve a intentarlo");
    }
    this._name = value;
  }
  set price(value) {
    if (!validateType(value, "number")) {
      throw new Error("Valor inválido. Vuelve a intentarlo");
    }
    if (value <= 0)
      throw new Error("No se permiten numero menor a. Vuelve a intentarlo");
    this._price = value;
  }
  set stock(value) {
    if (!validateType(value, "number")) {
      throw new Error("Valor inválido. Vuelve a intentarlo");
    }
    if (value <= 0)
      throw new Error("No se permiten numero menor a. Vuelve a intentarlo");
    this._stock = value;
  }
  set lastSupplyDate(value) {
    if (!validateType(value, "object")) {
      throw new Error("Valor inválido. Vuelve a intentarlo");
    }
    if (validateDate(value)) {
      throw new Error("Fecha con formato inválido. Vuelve a intentarlo");
    }
    this._lastSupplyDate = value;
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get price() {
    return this._price;
  }
  get lastSupplyDate() {
    return this._lastSupplyDate;
  }
  get stock() {
    return this._stock;
  }
}

export { Producto };
