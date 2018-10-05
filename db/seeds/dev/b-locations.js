
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {
          id: 1, 
          location_name: 'Red Rocks', 
          lat: '39.6654',
          lng: '105.2057'
        },
        {
          id: 2, 
          location_name: 'Breckenridge', 
          lat: '39.6654',
          lng: '105.2057'
        }
      ]);
    });
};
