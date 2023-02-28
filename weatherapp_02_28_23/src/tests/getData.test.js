import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getWeather from '../api/getData';

// This sets the mock adapter on the default axios instance
const mockAxios = new MockAdapter(axios);

describe('the api returned correct data for philadelphia', () => {
  // seed data for all get requests. You can specify an endpoint to mock
  mockAxios.onGet().reply(200, {
    name: 'Philadelphia', main: { temp: 70 },
  });

  test('the city is Philadelphia (async/await)', async () => {
    const data = await getWeather();
    expect(data.name).toBe('Philadelphia');
  });

  test('the temperature in Philadelphia is correct', async () => {
    const data = await getWeather();
    expect(data.main.temp).toBe(70);
  });

  test('the temperature in Philadelphia is not 80', async () => {
    const data = await getWeather();
    expect(data.main.temp).not.toBe(80);
  });

  test('the city is Philadelphia (then/catch)', () => getWeather().then((data) => expect(data.name).toBe('Philadelphia')));
});
