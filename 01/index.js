// Starting up express...
const express = require('express');
// Setting up the Database...
const Datastore = require('nedb');
const app = express();
// Listening to port 3000 on local server....
app.listen(3000, () => console.log('listening at 3000...'));
// Uses the public folder in the directory...
app.use(express.static('public'));
// Sets limit to json file format coming in...
app.use(express.json({ limit:'1mb' }));
// Creating/Loading database....
const database = new Datastore('database.db');
database.loadDatabase();

// posts json data to client...
app.post('/api', (request, response) => {
  console.log('Request received');
  console.log(request.body);
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  //adding data to the database...
  database.insert(data);
  console.log(database);
  // Sends back data to client....
  response.json({ 
    status: "Success",
    timestamp: timestamp,
    latitude: data.lat,
    longitude: data.lon
  });
});


