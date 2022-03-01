const storage =  require('./storage');

test('init localstorage', ()=> {
 storage.initLocalStorage();
 expect(localStorage.__STORE__['game']).toBe(JSON.stringify([])); // test that the value for game is empty list
 expect(Object.keys(localStorage.__STORE__).length).toBe(1);
})

test('stores the players in localstorage', () => {
    storage.addPlayer({name:'test', score:7});
  expect(localStorage.__STORE__['game']).toBe(JSON.stringify([{name:'test', score:7}]));
  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  test('exception', () => { 
    let err;
    try{
      storage.addPlayer({name:'test'});
    }catch(e){
      err = e;
    }

    expect(err).not.toBe(undefined);
    expect(err.message).toBe('invalid player');
  
  });