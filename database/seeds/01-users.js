exports.seed = function (knex, Promise) {
  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([
        { username: "user1", password: "test" },
        { username: "user2", password: "test2" },
        { username: "user3", password: "test3" },
      ]);
    });
};
