// import express
const express = require('express');

// create our express app
const webapp = express();

//configure the app to handle JSON and to parse request body
webapp.use(express.json());
webapp.use(express.urlencoded({
    extended: true,
}));
//list of players
let players = [];
// implement the endpoints
//Root endpoint
webapp.get('/', (req, resp) => {
    resp.json({message: 'Hello CIS350. How are you?'});
});

// addPlayer endpoint
webapp.post('/login', (req, resp)=>{
     // check the name was provided
     if(!req.body.name || req.body.name.length === 0){
         resp.status(404).json({error: 'username not provided'});
     }
    // add player to list
    players.push(req.body.name)
    //send the response
    resp.status(201).json({message: `${req.body.name} added`});

});

// Get players endpoint
webapp.get('/players', (req, resp) => {
  resp.json({data: players});
});

// declare the port
const port = 5000;

//start the app
webapp.listen(port, () =>{
    console.log(`Express server running on port:${port}`);
});