const bookshelf = require("bookshelf");
const _ = require("lodash");

const knex = require("knex")({
  client: "mysql2",
  connection: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    charset: "utf8mb4",
    timezone: "Z",
    decimalNumbers: true,
  },
});

const bookshelfInstance = bookshelf(knex);

bookshelfInstance.Model = bookshelfInstance.Model.extend({
  parse(response) {
    return _.mapKeys(response, (value, key) => _.camelCase(key));
  },
  format(attributes) {
    return _.mapKeys(attributes, (value, key) => _.snakeCase(key));
  },
  requireFetch: false,
});

module.exports = bookshelfInstance;
