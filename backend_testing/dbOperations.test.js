// import dbOperations
const dbModule = require('./dbOperations');

// declare db object
let db;

// MongoDB URL
const url = 'mongodb+srv://cis350coding:cis350coding@cluster0.if3dm.mongodb.net/Live_Coding?retryWrites=true&w=majority';

// declare test data
const player = {
    player: 'testuser',
    points: 0,
   };

test('addPlayer inserts a new player', async () =>{
    // connect to the db
    db = await dbModule.connect(url);
    //call addPlayer
    await dbModule.addPlayer(db, player);
    // find testplayer in the DB
    const newPlayer = await db.collection('Players').findOne({player: 'testuser'});
    //test that newPlayer is testuser
    expect(newPlayer.player).toEqual('testuser');
});

test('addPlayer throws an exception', async () =>{

     // connect to the db
     db = await dbModule.connect(url);

     // incorrect document
     const player1 = 'testuser';
    try{
       
    await dbModule.addPlayer(db, player1);

    }
    catch(err){
        // test error message
        expect(err.message).toBe('could not add a player');
    }  
});

test('getPlayers retrieves all the players a new player', async () =>{
    // connect to the db
    db = await dbModule.connect(url);
    //call addPlayers
    await dbModule.addPlayer(db, {player: 'player1', points: 0});
    await dbModule.addPlayer(db, {player: 'player2', points: 4});
    await dbModule.addPlayer(db, {player: 'player3', points: 1});

    // call getPlayers
    const users = await dbModule.getPlayers(db);
    // get all the playes in the DB
    const usersDB = await db.collection('Players').find({}).toArray();
    //test that users matches  usersDB
    expect(users).toEqual(usersDB);
});