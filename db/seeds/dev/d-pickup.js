
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pickup').del()
    .then(function () {
      // Inserts seed entries
      return knex('pickup').insert([
        {
          id: 1, 
          ride_id: 1,
          location_id: 1,
          lat: '39.758814',
          lng: '-104.987467',
          isShowing: false,
          address: '2500 Broadway, Denver, CO'
        },
        {
          id: 2, 
          ride_id: 2,
          location_id: 2,
          lat: '39.7594866',
          lng: '-104.9994026',
          isShowing: false,
          address: '2905 Inca St, Denver, CO 80202, USA'
        },
        {
          id: 3, 
          ride_id: 3,
          location_id: 1,
          lat: '39.7389255',
          lng: '-104.9910248',
          isShowing: false,
          address: '1437 Bannock St, Denver, CO 80202, USA'
        },
        {
          id: 4, 
          ride_id: 4,
          location_id: 1,
          lat: '39.754572',
          lng: '-104.994299',
          isShowing: false,
          address: 'Coors Field'
        }
      ]);
    });
};
