/**
 * This module contains MongoDB connection operations
 */

// import the driver
const { MongoClient } = require('mongodb');

// DB location
const dbURL = 'mongodb+srv://cis350coding:cis3500-2024.1@cluster0.if3dm.mongodb.net/SP24_3500_Project?retryWrites=true&w=majority&appName=Cluster0';

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
};
