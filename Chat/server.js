// import express
const express = require('express');
// import cors
const cors = require('cors');

// import jsonwebtoken
const jwt = require('jsonwebtoken');

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

// endpoints
// join
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
    }, 'this_is_a_secret_key', {expiresIn: 30});
    resp.status(201).json({token: userToken});
});

const port = 8080;

//start the express app
webapp.listen(port, ()=> {
    console.log(`server running on port: ${port}`);
})



