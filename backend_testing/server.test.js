// import supertest
const request = require('supertest');

// import our web app
const webapp = require('./server');

test('/login endpoint status code and response 404',  ()=>{
    //construct a supertest request with our app
    // send an HTTP POST request with data (body)
    
    request(webapp).post('/login/').send({test:'hey'})
    .expect(404) // test the response status code
    .then((response) =>{ // process the response
        expect(JSON.parse(response.text).error).toBe('username not provided');
    });
})