import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import getWeather from '../api/getData';

function WeatherBox({ city, temp, weather }) {
  return (
    <div>
      <ul>
        <li id="city">
          {' '}
          City:
          {' '}
          {city}
        </li>
        <li id="temp">
          {' '}
          Temp:
          {' '}
          {temp}
        </li>
        <li id="desc">
          {' '}
          Current Weather:
          {' '}
          {weather}
        </li>
      </ul>
    </div>
  );
}

WeatherBox.propTypes = {
  city: PropTypes.string,
  temp: PropTypes.number,
  weather: PropTypes.string,
};
WeatherBox.defaultProps = {
  city: 'N/A',
  temp: 0,
  weather: 'N/A',
};

function WeatherComponent({ typedCity }) {
  // add state
  const [weather, setWeather] = useState({});
  const city = useRef('');
  // Get the city param from the URL if it is not typed.
  // this allows us to do deep linking
  if (!typedCity || typedCity === '') {
    city.current = useParams().city;
  } else {
    city.current = typedCity;
  }

  // load the weather data  inside useEffect
  useEffect(() => {
    // Fetches data from the openweathermap API and updates the DOM
    const getWeatherWrapper = async () => {
      try {
        const response = await getWeather(city.current);
        setWeather({ city: `${city.current}`, temp: `${response.main.temp}`, weather: `${response.weather[0].description}` });
      } catch (err) {
        console.error('error', err.message);
      }
    };

    getWeatherWrapper();
  }, [city.current]);
  return (
    <div>
      <WeatherBox city={weather.city} temp={Number(weather.temp)} weather={weather.weather} />
    </div>
  );
}

WeatherComponent.propTypes = {
  typedCity: PropTypes.string,
};
WeatherComponent.defaultProps = {
  typedCity: '',
};

export default WeatherComponent;
