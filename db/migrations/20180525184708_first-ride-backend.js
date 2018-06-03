
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('locations', function(table) {
      table.increments('id')
      table.string('location_name');
      table.string('lat');
      table.string('lng');
    }),
    knex.schema.createTable('rides', function(table) {
      table.increments('id')
      table.integer('location_id').unsigned();
      table.foreign('location_id')
      .references('locations.id');
      table.integer('driver_id').unsigned()
      table.foreign('driver_id')
      .references('users.id');
      table.string('car_capacity');
      table.string('seats_remaining');
      table.string('car_type');
      table.string('date');
      table.string('time');
    }),
    knex.schema.createTable('rides_passengers', function(table) {
      table.increments('id')
      table.integer('ride_id').unsigned()
      table.foreign('ride_id')
      .references('rides.id');
      table.integer('passenger_id').unsigned()
      table.foreign('passenger_id')
      .references('users.id');
      table.integer('location_id').unsigned()
      table.foreign('location_id')
      .references('locations.id');
    }),
    knex.schema.createTable('pickup', function(table) {
      table.increments('id')
      table.integer('ride_id').unsigned();
      table.foreign('ride_id')
      .references('rides.id');
      table.integer('location_id').unsigned();
      table.foreign('location_id')
      .references('locations.id');
      table.string('lat');
      table.string('lng');
      table.bool('isShowing');
    }),
    knex.schema.createTable('users', function(table) {
      table.increments('id')
      table.string('user_name');
      table.string('email');
      table.string('password');
    }),
    knex.schema.createTable('profiles', function(table) {
      table.increments('id')
      table.integer('profile_id').unsigned();
      table.foreign('profile_id')
      .references('users.id');
      table.string('bio');
      table.string('rating');
      table.string('user_img');
      table.string('reviews');
    })]
  )
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('rides'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('pickup'),
    knex.schema.dropTable('profiles')
  ]);
};
