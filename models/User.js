// models/Product.js
// Obtiene la conexión con la base de datos
const knex = require("../database/connection");

exports.createUser = (name, email, role, password) => {
  const result = knex
    .from("users")
    .insert({ name: name, email: email, role: role, password: password });
  return result;
};

exports.findByEmail = email => {
  const result = knex.from("users").where({ email: email });
  return result;
};

exports.findAll = () => {
  const result = knex.from("users").timeout(1000, { cancel: true });
  return result;
};
