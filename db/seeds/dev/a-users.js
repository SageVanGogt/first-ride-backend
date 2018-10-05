
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {
          id: 1, 
          user_name: 'sage',
          email: 'thurmanvogt@gmail.com',
          password: 'sage'
        },
        {
          id: 2, 
          user_name: 'jack',
          email: 'jack@gmail.com',
          password: 'sage'
        },
        {
          id: 3, 
          user_name: 'rage',
          email: 'sage@gmail.com',
          password: 'sage'
        }
      ]);
    });
};
