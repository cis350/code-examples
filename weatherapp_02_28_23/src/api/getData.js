// https://openweathermap.org/api/one-call-3

import axios from 'axios';

const getWeather = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d01dbe80c384ea20a6937f2aa98848d&units=imperial`;
  const res = await axios.get(url); // fetch(location);
  return res.data;
};

export default getWeather;
