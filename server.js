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

app.get('/api/rides_passengers/', (request, response) => {
  return database('rides_passengers').select()
  .then(data => {
    return response.status(200).json({data});
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

app.post('/api/rides_passengers/get/passengers/:id', (request, response) => {
  const id = request.params.id
  return database('rides_passengers').where({
    ride_id: id
  }).select()
  .then(ride => {
    return response.status(200)
    .json({
      ride
    });
  })
  .catch(err => {
    response.status(500).json({error: err.detail});
  })
})

app.post('/api/users/get/:id', (request, response) => {
  const id = request.params.id
  return database('users').where({
    ride_along_id: id
  }).select()
  .then(users => {
    return response.status(200)
    .json({
      users
    });
  })
  .catch(err => {
    response.status(500).json({error: err.detail});
  })
})

// app.patch('/api/users/:id', (request, response) => {
//   const id = request.params.id
//   console.log(request)
//   return database('users').where({
//     id: id
//   }).select()
//   .insert(request.body)
//   .then(users => {
//     return response.status(200)
//     .json({
//       users
//     });
//   })
//   .catch(err => {
//     response.status(500).json({error: err.detail});
//   })
// })

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
  return database('rides')
  .returning('id')
  .insert(request.body)
  .then(rideId => {
    return response.status(200).json({
      status: 'success',
      message: "ride added to db",
      id: rideId[0]
    })
  });
})

app.post('/api/rides_passengers/new', (request, response) => {
  return database('rides_passengers')
  .insert(request.body)
  .then(() => {
    return response.status(200).json({
      status: 'success',
      message: "ride/passenger added to db"
    })
  });
})

app.post('/api/users/new', (request, response) => {
  return database('users').insert(request.body)
  .then((user) => {
    return response.status(201).json({
      status: 'success'
    })
  });
})

app.post('/api/pickup/new', (request, response) => {
  return database('pickup').insert(request.body)
  .returning('id')
  .then((pickup) => {
    return response.status(201).json({
      status: 'success',
      id: pickup[0]
    })
  });
})

app.listen(3000, () => {
  console.log('Express intro running on localhost: 3000');
});

