
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rides').del()
    .then(function () {
      // Inserts seed entries
      return knex('rides').insert([
        {
          id: 1, 
          location_id: 1,
          driver_id: 1,
          car_capacity: '4',
          seats_remaining: '2',
          car_type: 'prius',
          date: '6/1/2018',
          time: '4:00pm'
        },
        {
          id: 2, 
          location_id: 2,
          driver_id: 1,
          car_capacity: '40',
          seats_remaining: '28',
          car_type: 'partbus',
          date: '6/1/2018',
          time: '5:00pm'
        },
        {
          id: 3, 
          location_id: 1,
          driver_id: 2,
          car_capacity: '14',
          seats_remaining: '7',
          car_type: 'limo',
          date: '6/1/2018',
          time: '6:00pm'
        },
        {
          id: 4, 
          location_id: 1,
          driver_id: 2,
          car_capacity: '10',
          seats_remaining: '9',
          car_type: 'herse',
          date: '6/1/2018',
          time: '7:00pm'
        }
      ]);
    });
};
