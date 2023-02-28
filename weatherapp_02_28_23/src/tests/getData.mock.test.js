import getWeather from '../api/getData';

jest.mock('../api/getData.js');

// We mock getWeather
getWeather.mockResolvedValue({ name: 'Philadelphia', main: { temp: 70 } });

test('the temperature is correct', async () => {
  const data = await getWeather('Philadelphia');
  expect(data.main.temp).toBe(70);
});

test('the temperature in Philadelphia is not 80', async () => {
  const data = await getWeather();
  expect(data.main.temp).not.toBe(80);
});
