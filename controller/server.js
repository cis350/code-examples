/**
 * Express webserver / controller
 */

// import express
const express = require('express');

// import the cors -cross origin resource sharing- module
const cors = require('cors');

// create a new express app
const webapp = express();


// local files
const path = require('path'); 

// import authentication functions
const { authenticateUser, verifyUser, blacklistJWT } = require('./utils/auth');
// enable cors
webapp.use(cors());

// configure express to parse request bodies
webapp.use(express.urlencoded({ extended: true }));

// import the db function
const users = require('../model/users');

// import path to allow express to access


// provide the location of the static files 
// aka React app
webapp.use(express.static(path.join(__dirname, './frontend/build')));

// root endpoint route
webapp.get('/', (_req, resp) => {
 // resp.json({ message: 'hello CIS3500 SP24!!!' });
 resp.sendFile(path.join(__dirname, './frontend/build/index.html'));
});

/**
 * Login endpoint
 * The name is used to log in
 */
webapp.post('/login', (req, resp) => {
  // check that the name was sent in the body
  if (!req.body.username || req.body.username === '') {
    resp.status(401).json({ error: 'empty or missing username' });
    return;
  }
  if (!req.body.password || req.body.password === '') {
    resp.status(401).json({ error: 'empty or missing password' });
    return;
  }
  // authenticate the user
  try {
    const token = authenticateUser(req.body.username, req.body.password);
    resp.status(201).json({ apptoken: token });
  } catch (err) {
    console.log('error login', err.message);
    resp.status(401).json({ error: 'hey I am an error' });
  }
});

/**
 * Logout endpoint
 * use JWT for authentication
 * Ends the session
 */
webapp.post('/logout', async (req, resp) => {
  // verify the session
  console.log('logout', req.headers.authorization);
  try {
    const authResp = await verifyUser(req.headers.authorization);
    if (authResp === 1) { // expired session
      resp.status(403).json({ message: 'Session expired already' });
      return;
    }
    if (authResp === 2 || authResp === 3) { // invalid user or jwt
      resp.status(401).json({ message: 'Invalid user or session' });
      return;
    }
    // session valid blacklist the JWT
    blacklistJWT(req.headers.authorization);
    resp.status(200).json({ message: 'Session terminated' });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

/**
 * route implementation GET /users
 */
webapp.get('/users', async (_req, resp) => {
  try {
    // get the data from the DB
    const allUsers = await users.getAllUsers();
    // send response
    resp.status(200).json({ data: allUsers });
  } catch (err) {
    // send the error code
    resp.status(400).json({ message: 'There was an error' });
  }
});

/**
 * route implementation GET /user/:id
 */
webapp.get('/user/:id', async (req, res) => {
  console.log('READ a user');
  try {
    // get the data from the db
    const result = await users.getUser(req.params.id);
    if (result === undefined) {
      res.status(404).json({ error: 'unknown user' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(400).json({ message: 'there was error' });
  }
});

/**
 * route implementation POST /user
 * validate the session
 */
webapp.post('/user', async (req, resp) => {
  // parse the body
  if (!req.body.username || !req.body.password) {
    resp.status(404).json({ message: 'missing name, email or major in the body' });
    return;
  }
  // verify the session
  if (await verifyUser(req.headers.authorization)) {
    try {
      // create the new user object
      const newUser = {
        username: req.body.username,
        password: req.body.password,
      };
      const result = await users.addUser(newUser);
      resp.status(201).json({ data: { id: result } });
    } catch (err) {
      resp.status(400).json({ message: 'There was an error' });
    }
  } else {
    resp.status(401).json({ message: 'Failed Authentication' });
  }
});

/**
 * route implementation DELETE /user/:id
 */
webapp.delete('/user/:id', async (req, res) => {
  try {
    const result = await users.deleteUser(req.params.id);
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'user not in the system' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: 'there was error' });
  }
});

/**
 * route implementation PUT /user/:id
 */
webapp.put('/user/:id', async (req, res) => {
  console.log('UPDATE a user');
  // parse the body of the request
  if (!req.body.password) {
    res.status(400).json({ message: 'missing major' });
    return;
  }
  try {
    const result = await users.updateUser(req.params.id, req.body.password);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

webapp.get('*', (req, resp) =>{
  resp.sendFile(path.join(__dirname, './frontend/build/index.html'));
});

// export the webapp
module.exports = webapp;
