const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
app.set('port', process.env.PORT || 3000);

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

app.post('/api/rides/:id/get/user/', (request, response) => {
  const rideId = request.params.id
  return database('rides').where({
    id: rideId
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
    location_id: id
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

app.post('/api/rides_passengers/get/rides/:id', (request, response) => {
  const id = request.params.id
  return database('rides_passengers').where({
    passenger_id: id
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

app.post('/api/profiles/get/:id', (request, response) => {
  const id = request.params.id
  return database('profiles').where({
    profile_id: id
  }).select()
  .then(profile => {
    return response.status(200)
    .json({
      profile
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
  .returning('*')
  .insert(request.body)
  .then(ride => {
    return response.status(200).json({
      status: 'success',
      message: "ride added to db",
      id: ride[0].id,
      ride: ride[0]
    })
  });
})

app.post('/api/rides_passengers/new', (request, response) => {
  return database('rides_passengers')
  .returning('*')
  .insert(request.body)
  .then((ride) => {
    return response.status(200).json({
      status: 'success',
      message: "ride/passenger added to db",
      ride: ride[0]
    })
  })
})

app.post('/api/users/new', (request, response) => {
  return database('users').insert(request.body)
  .returning('id')
  .then((user) => {
    return response.status(201).json({
      status: 'success',
      id: user[0]
    })
  });
})

app.post('/api/profiles/new', (request, response) => {
  return database('profiles').insert(request.body)
  .then((profile) => {
    return response.status(201).json({
      status: 'success'
    })
  });
})

app.post('/api/pickup/new', (request, response) => {
  return database('pickup').insert(request.body)
  .returning('*')
  .then((pickup) => {
    return response.status(201).json({
      status: 'success',
      pickup: pickup[0]
    })
  });
})

app.delete('/api/rides/:id/passengers/:user_id/destination/:loc_id', (request, response) => {
  var passenger = request.params.user_id;
  var ride = request.params.id;
  var location = request.params.loc_id;
  return database('rides_passengers').where({
    ride_id: ride,
    passenger_id: passenger
  }).del()
  .returning('id')
  .then((id) => {
    return response.status(201).json({
      status: 'success',
      id
    })
  });
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Express intro running on localhost: 3000');
});

module.exports = app;

