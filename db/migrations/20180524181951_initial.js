
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('locations', function(table) {
      table.increments('id');
      table.string('location_name');
    }),
    knex.schema.createTable('rides', function(table) {
      table.increments('id');
      table.integer('location_id').unsigned();
      table.foreign('location_id')
      .references('locations.id');
      table.string('driver_id').unsigned()
      table.foreign('driver_id')
      .references('users.id');
      table.string('car_capacity').unsigned();
      table.string('seats_remaining').unsigned();
      table.string('car_type').unsigned();
      table.string('date').unsigned();
      table.string('time').unsigned();
    }),
    knex.schema.createTable('pickup', function(table) {
      table.increments('id');
      table.integer('ride_id').unsigned();
      table.foreign('ride_id')
      .references('rides.id');
      table.integer('location_id').unsigned();
      table.foreign('location_id')
      .references('locations.id');
    }),
    knex.schema.createTable('users', function(table) {
      table.increments('id');
      table.string('user_id').unsigned();
      table.string('user_img').unsigned();
      table.string('bio').unsigned();
      table.string('rating').unsigned();
    })]
  )
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('rides'),
    knex.schema.dropTable('users')
  ]);
};
