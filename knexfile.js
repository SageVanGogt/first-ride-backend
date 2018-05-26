module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/firstride',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};