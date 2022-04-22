// import express
const express = require('express');
// import cors
const cors = require('cors');

// import jsonwebtoken
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

// create express app
const webapp = express();

// configure the app
webapp.use(express.json());
webapp.use(express.urlencoded({
    extended: true,
}));

// configure cors
webapp.use(cors({
    credentials: true,
    origin: true
}));


// set of 
let users = new Set();



// endpoints
// join creates a new session
// use JWT to manage the session
webapp.post('/join/', (req, resp) => {
    // check that the username was sent
    if(!req.body.username || req.body.username.length ===0){
        resp.status(400).json({error: 'missing usernamne'});
        return;
    }
    // get username
    const username = req.body.username;
    // create the JWT
    const userToken = jwt.sign({
        name: username,
    }, 'this_is_a_secret_key', {expiresIn: '1h'});

    // add the user to the set of users
    users.add(username);
    resp.status(201).json({token: userToken});
});

// this route validates a seesion
//return 200 if the session is valid
// return 302 if the session is no longer valid
webapp.post('/verify/', (req, resp) => {
    // check that the token was sent
    if(!req.body.token || req.body.token.length === 0){
        resp.status(400).json({error: 'missing token'});
        return;
    }
    // get the token
    const userToken = req.body.token;
    
    // verify the user token
    jwt.verify(userToken, 'this_is_a_secret_key', function(err, ){
        if(err){
            
            // check if the error is an expiration error
            if(err.name === 'TokenExpiredError'){
                resp.status(302).json({error: 'session expired'});
                return;
            }
        }
        resp.json({message: 'session valid'});
    })
});

// users endpoint - return the list of users
webapp.get('/users', (_req, res) =>{
    console.log('users', users);
     res.json({
         data: Array.from(users),
     })
});

const port = 8080;

//start the express app
webapp.listen(port, ()=> {
    console.log(`server running on port: ${port}`);
})



