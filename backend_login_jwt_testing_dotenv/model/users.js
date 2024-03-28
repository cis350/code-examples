// CREATE a new student
// takes a db connector and a student object
// and add the user to the DB
const {closeMongoDBConnection, getDB } = require('./dbUtils');

// import ObjectID
const { ObjectId } = require('mongodb');

/**
 * 
 * @param {*} newStudent 
 * @returns 
 */
const addUser = async (newUser) => {
    try{
        // get the db
        const db = await getDB();
        const result = await db.collection('users').insertOne(newUser);
        // print the id of the student
        console.log(`New user created with id: ${result.insertedId}`);
        // return the result
        return result.insertedId;
    }catch(err){
        console.log(`error: ${err.message}`);
    }
  };
  
  /**
   * 
   * @returns 
   */
  const getAllUsers = async () => {
    try {
      // get the db
      const db = await getDB();
      const result = await db.collection('users').find({}).toArray();
      // print the results
      console.log(`Users: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };
  
  /**
   * GET/READ a user given their ID
   * @param {*} studentID 
   * @returns 
   */
  const getUser = async (userID) => {
    try {
      // get the db
      const db = await getDB();
      const result = await db.collection('users').findOne({ _id: new ObjectId(userID) });
      // print the result
      console.log(`User: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };
  
  /**
   * 
   * @param {*} studentName 
   * @returns 
   */
  const getUserByUName = async (username) => {
    try {
      // get the db
      const db = await getDB();
      const result = await db.collection('users').findOne({ username: username });
      // print the result
      console.log(`Student: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };
  
  // UPDATE a student given their ID
  const updateUser = async (userID, newUName) => {
    try {
      // get the db
      const db = await getDB();
      const result = await db.collection('users').updateOne(
        { _id: ObjectId(userID) },
        { $set: { username: newUName } },
      );
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };
  
  // DELETE a student given their ID
  const deleteUser = async (userID) => {
    try {
      // get the db
      const db = await getDB();
      const result = await db.collection('users').deleteOne(
        { _id:  ObjectId(userID) },
      );
      // print the result
      console.log(`Student: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  async function main(){
    // await addUser({username: 'toto2', password: 'tata2'});
    await getAllUsers();
    
   await closeMongoDBConnection();
  }
  // main();
  // export the functions
  module.exports = {
    addUser,
    getAllUsers,
    getUser,
    getUserByUName,
    updateUser,
    deleteUser,
  };
  