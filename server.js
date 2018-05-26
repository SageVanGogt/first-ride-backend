const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/', (request, response) => {
  return response.status(200).json('text');
});

app.get('/api/locations', (request, response) => {
  return database('locations').select()
  .then(locations => {
    return response.status(200).json({locations});
  });
})

// app.get('/api/venues', (request, response) => {
//   return database('locations').where({
//     user_id: null
//   }).select()
//   .then(locations => {
//     return response.status(200).json({locations});
//   });
// })

app.get('/api/users', (request, response) => {
  return database('users').select()
  .then(users => {
    return response.status(200).json({users});
  });
})

app.get('/api/rides', (request, response) => {
  return database('rides').select()
  .then(rides => {
    return response.status(200).json({rides});
  });
})

app.get('/api/pickup', (request, response) => {
  return database('pickup').select()
  .then(pickup => {
    return response.status(200).json({pickup});
  });
})

app.post('/api/locations/new', (request, response) => {
  console.log(request.body);
  return database('locations').insert(request.body)
  .then(() => {
    return response.status(201).json({status: 'success'})
  });
})

// app.post('/api/locations/new', (request, response) => {
//   console.log(request.body);
//   return database('locations').insert(request.body)
//   .then(() => {
//     return response.status(201).json({status: 'success'})
//   });
// })

app.post('/api/rides/new', (request, response) => {
  console.log(request.body);
  return database('rides').insert(request.body)
  .then(() => {
    return response.status(201).json({status: 'success'})
  });
})

app.post('/api/users/new', (request, response) => {
  console.log(request.body);
  return database('users').insert(request.body)
  .then(() => {
    return response.status(201).json({status: 'success'})
  });
})

app.post('/api/pickup/new', (request, response) => {
  console.log(request.body);
  return database('pickup').insert(request.body)
  .then(() => {
    return response.status(201).json({status: 'success'})
  });
})

app.listen(3000, () => {
  console.log('Express intro running on localhost: 3000');
});

