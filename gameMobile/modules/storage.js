// initialize localstorage entry
function initLocalStorage(){
    if(!localStorage.getItem('game')){
        localStorage.setItem('game', JSON.stringify([]));
    }
}

// a player must hav e a name and a score
function addPlayer(player){
    if(!player.name || !player.score){
        throw new Error('invalid player');
    }
    let l = JSON.parse(localStorage.getItem('game'));
    //add player to the list
    l.push(player);
    localStorage.setItem('game', JSON.stringify(l));
}

module.exports = {initLocalStorage, addPlayer};