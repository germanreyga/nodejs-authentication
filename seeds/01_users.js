// seeds/01_products.js
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          name: "Basik Gutiérrez",
          email: "hola@gmail.com",
          password: "123",
          role: "basic"
        },
        {
          name: "Manuel Admino",
          email: "hello@outlook.com",
          password: "123",
          role: "admin"
        }
      ]);
    });
};
