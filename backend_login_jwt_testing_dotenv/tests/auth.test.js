const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../model/dbUtils');
const webapp = require('../controller/server');

// import test utilities function
const { testUser } = require('./testUtils');

describe('POST /login  enpoint tests', () => {
  let mongo; // local mongo connection
  let response; // the response from our express server
  /**
       * We need to make the request to the endpoint
       * before running any test.
       * We need to connecto the DB for all the DB checks
       * If beforeAll is undefined
       * inside .eslintrc.js, add 'jest' to the 'env' key
       */
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();

    // send the request to the API and collect the response
    response = await request(webapp).post('/login').send(`username=${testUser.username}&password=${testUser.password}`);
    console.log('response', response.text);
  });

  /**
   * After running the tests, we need to remove any test data from the DB
   * We need to close the mongodb connection
   */
  afterAll(async () => {
    // we need to clear the DB
    try {
      // await deleteTestDataFromDB(db, 'testuser');
      await mongo.close(); // the db connection in beforeAll
      await closeMongoDBConnection(); // the db connection in missing uname
      await closeMongoDBConnection(); // the db connection in missing password
    } catch (err) {
      return err;
    }
  });

  /**
   * Status code and response type
   */
  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });

  test('the JWT is in the response', () => {
    // expect the JWT of the new session should not be undefined
    console.log('returned data id', response.text);
    expect(JSON.parse(response.text).apptoken).not.toBe(undefined);
  });

  test('missing a field (password) 401', async () => {
    const res = await request(webapp).post('/login/')
      .send('usernamename=testuser');
    expect(res.status).toEqual(401);
  });

  test('missing a field (username) 401', async () => {
    const res = await request(webapp).post('/login/')
      .send('password=testuser');
    expect(res.status).toEqual(401);
  });
});
