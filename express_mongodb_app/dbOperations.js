// 1. Import MongoDB driver
const { MongoClient } = require('mongodb');

//2. Connect to the DB and return the connection object
const connect = async (url) =>{
    try{
       const conn = (await MongoClient.connect(url,
        {useNewUrlParser: true, useUnifiedTopology: true})).db();
        console.log(`Connected to the database: ${conn.databaseName}`);
        return conn;
    } catch(err){
        console.error(err);
        throw new Error('could not connect to the db');
    }
}

//3. add a player to the DB
const addPlayer = async (db, newPlayer) => {
    try{
        const result = await db.collection('Players').insertOne(newPlayer);
        console.log(`Created player with id: ${result.insertedId}`);
        return result;

    }catch(err){
        console.error(err);
        throw new Error('could not add a player');
    }

}

//3. get all players
async function getPlayers(db){
    try{
        // retrieve all the players in the collection and convert the cursor
        // to an array
        const results = await db.collection('Players').find({}).toArray();
        return results;
    }catch(err){
        console.error(err);
        throw new Error('could not retrieve players');
    }

}

module.exports = { connect, addPlayer, getPlayers };
/** 
const main = async () => {
    let db = await connect('mongodb+srv://cis350coding:cis350coding@cluster0.if3dm.mongodb.net/Live_Coding?retryWrites=true&w=majority');
    // await addPlayer(db, {name: 'Chris', points: 0});
    // await addPlayer(db, {name: 'Lena', points: 1});
    const results = await getPlayers(db);
    console.log(results);
}

main();
*/

