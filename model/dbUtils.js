// this is a node app, we must use commonJS modules/ require

// import the env variables
require('dotenv').config();

// import the mongodb driver
const { MongoClient } = require('mongodb');

// the mongodb server URL
const dbURL = process.env.DB_URL;

// MongoDB database connection
let MongoConnection;

/**
 * SRP: connects to MongoDB and return the connection handle
 */

// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = (await MongoClient.connect(
      dbURL,
    )); // we return the entire connection, not just the DB
    // check that we are connected to the db
    console.log(`connected to db: ${MongoConnection.db().databaseName}`);
    return MongoConnection;
  } catch (err) {
    console.log(err.message);
  }
};
/**
 *
 * @returns the database attached to this MongoDB connection
 */
const getDB = async () => {
  // test if there is an active connection
  if (!MongoConnection) {
    await connect();
  }
  return MongoConnection.db();
};

/**
 *
 * Close the mongodb connection
 */
const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

// export the functions
module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
};
