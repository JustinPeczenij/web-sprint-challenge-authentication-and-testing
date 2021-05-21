
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', password: '$2a$08$xgNYEvHsoJm0Kfbn7lxZiODfzAX7eZMACg4Ml.JpmjnObX1DG7jRe'}, //1234
        {id: 2, username: 'bonto', password: '$2a$08$LADeY4BUnCtZpEXfPjaxoeZGtNhE6yQbJ/M6D.uP0X/RCoJSFofni'}, //1234
      ]);
    });
};
