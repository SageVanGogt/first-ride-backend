
exports.seed = function(knex, Promise) {
  return knex('table_name').del()
    .then(function () {
      return Promise.all([
        knex('locations').insert({
          id: 1, 
          location_name: 'Red Rocks', 
          location_lat_lng: '39.6654, 105.2057'
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
        knex('users').insert({
          id: 1, 
          user_id: '456',
          email: 'thurmanvogt@gmail.com',
          password: 'sage',
          user_img: 'http://us.cdn281.fansshare.com/photos/channingtatum/bfhgoi-ccaagvrc-large-fat-44506770.jpg',
          bio: 'i like food',
          rating: 'solid 7'
        }),
        knex('pickup').insert({
          id: 1, 
          ride_id: 1,
          location_id: 1,
          pickup_lat_lng: '40.7359, 73.991'
        })
      ]);
    });
};
