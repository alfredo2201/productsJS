import { createConnection } from "mysql";

/**
 * Mysql Connection Factory
 * @returns mysql database connection
 */
export const getConection = () => {
  return createConnection({
    host: "127.0.0.1",
    port: "3306",
    database: "store",
    user: "root",
    password: "1602",
  });
};
