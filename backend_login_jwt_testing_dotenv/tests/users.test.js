const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../model/dbUtils');
const webapp = require('../controller/server');

// import test utilities function
const {
  isInArray, testUser, insertTestDataToDB, deleteTestDataFromDB,
} = require('./testUtils');

// TEST POST ENDPOINT
describe('GET users(s) endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let mongo; // local mongo connection
  let db;
  let testUserID;

  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();

    // add test user to mongodb
    testUserID = await insertTestDataToDB(db, testUser);
  });

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    try {
      await deleteTestDataFromDB(db, testUser.username);
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Get all users endpoint status code and data', async () => {
    const resp = await request(webapp).get('/users/');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const usersList = JSON.parse(resp.text).data;
    // testuser is in the response
    // matching nested structures can be frustrating!
    // expect(usersList).toEqual(expect.arrayContaining([{ _id: testUserID, ...testUser }]));
    expect(isInArray(usersList, testUserID)).toBe(true);
  });

  test('Get: status code and data', async () => {
    const resp = await request(webapp).get(`/user/${testUserID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const user = JSON.parse(resp.text).data;
    // testStudent is in the response
    expect(JSON.stringify(user)).toBe(JSON.stringify({ _id: testUserID, ...testUser }));
  });

  test('user not in db status code 404', async () => {
    const resp = await request(webapp).get('/user/1');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });
});
