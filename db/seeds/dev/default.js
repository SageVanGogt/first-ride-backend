
exports.seed = function(knex, Promise) {
  return knex('table_name').del()
    .then(function () {
      return Promise.all([
        knex('locations').insert({
          id: 1, 
          location_name: 'Red Rocks', 
          location_lat_lng: '39.6654, 105.2057'
        }),
        knex('users').insert({
          id: 1, 
          user_name: 'thomas',
          email: 'thurmanvogt@gmail.com',
          password: 'sage'
        }),
        knex('rides').insert({
          id: 1, 
          location_id: 1,
          driver_id: 1,
          car_capacity: '4',
          seats_remaining: '2',
          car_type: 'prius',
          data: '6/1/2018',
          time: '4:00pm'
        }),
        knex('pickup').insert({
          id: 1, 
          ride_id: 1,
          location_id: 1,
          pickup_lat_lng: '40.7359, 73.991',
          isShowing: false,
          address: '2905 Inca St, Denver, CO 80202'
        }),
        knex('rides_passengers').insert({
          id: 1,
          ride_id: 1,
          passenger_id: 1,
          location_id: 1
        })
      ]);
    });
};
