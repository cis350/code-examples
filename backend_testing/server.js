// import express
const express = require('express');

// create our express app
const webapp = express();

// import database functions
const lib = require('./dbOperations');
// declare the database object
let db;

// MongoDB URL
const url = 'mongodb+srv://cis350coding:cis350coding@cluster0.if3dm.mongodb.net/Live_Coding?retryWrites=true&w=majority';

//configure the app to handle JSON and to parse request body
webapp.use(express.json());
webapp.use(express.urlencoded({
    extended: true,
}));

// implement the endpoints
//Root endpoint
webapp.get('/', (req, resp) => {
    resp.json({message: 'Hello CIS350. How are you?'});
});

// addPlayer endpoint
webapp.post('/login', async (req, resp)=>{
     // check the name was provided
     if(!req.body.name || req.body.name.length === 0){
        resp.status(404).json({error: 'username not provided'});
        return;
     }
     try{
         const result = await lib.addPlayer(db, {name: req.body.name, points: 3});
         //send the response
        resp.status(201).json({message: `Player with id ${JSON.stringify(result.insertedId)} added`});

     }catch(err){
        resp.status(500).json({error: 'try again later'});
    }

    

});

// Get players endpoint
webapp.get('/players',  async (_req, resp) => {
    try{
        const results = await lib.getPlayers(db);
        resp.status(200).json({data: results});
    }
    catch(err){
        resp.status(500).json({error: 'try again later'});
    }
});

// declare the port
const port = 5000;

//start the app and connect to the DB
webapp.listen(port, async () =>{
    try{
    db = await lib.connect(url);
    // console.log(`Express server running on port:${port}`);
    }catch(err){
        throw new Error('cannot start server');

    }
    
});

module.exports = webapp; // export for testing