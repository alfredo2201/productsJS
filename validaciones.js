const REGEXP =
  /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(1[0-9]{3}|2[0-9]{3})$/;

const REGEXP_NUMBER = /\d/;

/**
 * Funcion que valida que el valor del parametro 
 * sea una cadena con el formato de fecha
 * DD/MM/YYYY
 * @param {*} value 
 * @returns true en caso de que coincida
 */
const validateDate = (value) => REGEXP.test(value);

/**
 * Funcion que valida si un valor es del mismo tipo
 * que del valor de type en el parametro
 * @param {*} value 
 * @param {*} type 
 * @returns 
 */
const validateType = (value, type) => {
  if (value == undefined) {
    return false;
  }
  if (typeof value != type) {
    return false;
  }
  return true;
};

/**
 * Funcion que valida que el paramtro sea de tipo number
 * @param {*} value 
 * @returns 
 */
const validateNumber = (value) => REGEXP_NUMBER.test(value);

export { validateDate, validateType, validateNumber };
