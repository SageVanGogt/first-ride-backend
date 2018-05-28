const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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

app.get('/api/locations/:id', (request, response) => {
  const id = request.params.id
  return database('locations').where({
    location_name: id
  }).select()
  .then(locations => {
    return response.status(200).json({locations});
  });
})

app.post('/api/users', (request, response) => {
  return database('users').where({
    email: request.body.email,
    password: request.body.password
  }).select()
  .then(user => {
    return response.status(200).json({
      status: 'Success',
      user,
      message: 'Retrieved one user'
    });
  });
})

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

app.post('/api/rides/get/:id', (request, response) => {
  const id = request.params.id
  return database('rides').where({
    location_id: id
  }).select()
  .then(rides => {
    return response.status(200)
    .json({
      rides
    });
  })
  .catch(err => {
    response.status(500).json({error: err.detail});
  })
})

app.post('/api/pickup/get/:id', (request, response) => {
  const id = request.params.id
  return database('pickup').where({
    location_id: id
  }).select()
  .then(pickup => {
    return response.status(200)
    .json({
      pickup
    });
  })
  .catch(err => {
    response.status(500).json({error: err.detail});
  })
})

app.get('/api/pickup', (request, response) => {
  return database('pickup').select()
  .then(pickup => {
    return response.status(200).json({pickup});
  });
})

app.post('/api/locations/new', (request, response) => {
  return database('locations').insert(request.body)
  .then(() => {
    return response.status(201).json({status: 'success'})
  });
})

app.post('/api/rides/new', (request, response) => {
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
  return database('pickup').insert(request.body)
  .then(() => {
    return response.status(201).json({status: 'success'})
  });
})

app.listen(3000, () => {
  console.log('Express intro running on localhost: 3000');
});

