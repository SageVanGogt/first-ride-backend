
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rides_passengers').del()
    .then(function () {
      // Inserts seed entries
      return knex('rides_passengers').insert([
        {id: 1, ride_id: 1, passenger_id: 1, location_id: 1},
        {id: 2, ride_id: 2, passenger_id: 1, location_id: 1},
        {id: 3, ride_id: 3, passenger_id: 1, location_id: 1},
        {id: 4, ride_id: 4, passenger_id: 1, location_id: 1}
      ]);
    });
};
