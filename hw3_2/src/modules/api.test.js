const api = require('./api');
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

let mock;

beforeAll(() => {
    mock = new MockAdapter(axios);
});

// input: 'serena', output {id: 1, player:'serena', score:0}
test('addPlayer new player', async () => {
    // mock the axios response- new user 201
    mock.onPost("/login").reply(201, {player:  {id: 1, player:'serena', score:0}});
    const response = await api.addPlayer({name: 'serena'});
    expect(response.player).toMatchObject({id: 1, player:'serena', score:0});

});