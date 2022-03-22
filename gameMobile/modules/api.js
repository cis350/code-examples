import axios from "axios";
const rootURL = '';

// Add a player to the backend if it is a returning player
// their best score is returned
async function addPlayer(player){
    if(!player.name){
        throw new Error('invalid player');
    }
    try{ 
        const response = await axios.post(`${rootURL}/login`, {player: `${player.name}`});
        return response.data;

    } catch(err){
        throw err;
    }
};

module.exports = { addPlayer };

