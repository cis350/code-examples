import React, { useState, useRef } from 'react';
import WeatherComponent from './WeatherComponent';

function TypedCityComponent() {
  const [, setCity] = useState('');
  const typedCity = useRef('');

  const handleOnChange = (e) => {
    // store the city in the ref
    typedCity.current = e.target.value;
  };

  const handleOnClick = () => {
    // update the URL in the address bar
    window.history.pushState('string', '', `/weather/${typedCity.current}`);
    // update the state
    setCity(typedCity.current);
  };
  // conditiona rendering
  if (typedCity.current === '') {
    return (
      <div>
        <input type="text" onChange={handleOnChange} />
        <button type="button" onClick={handleOnClick}>OK</button>
      </div>
    );
  }
  return (
    <div>
      <input type="text" onChange={handleOnChange} />
      <button type="button" onClick={handleOnClick}>OK</button>
      <WeatherComponent typedCity={typedCity.current} />
    </div>
  );
}

export default TypedCityComponent;
