import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getWeather } from '../api/getData';
const WeatherBox = (props) => (
    <div>
      <ul>
        <li id="city">
          {' '}
          City: {props.weatherdata.city}
        </li>
        <li id="temp">
          {' '}
          Temp: {props.weatherdata.temp}
        </li>
        <li id="desc">
          {' '}
          Current Weather: {props.weatherdata.weather}
        </li>
      </ul>
    </div>
  );

  function WeatherComponent(props){

    // add state
    const [weather, setWeather] = useState({});
    // Get the userId param from the URL.
    let { city } = useParams();
    // load the weather date  inside useEffect
    useEffect(() => {
        
         // Fetches data from the openweathermap API and updates the DOM
         const getWeatherWrapper = async () => {
          try{
          const response = await getWeather(city);
          setWeather({city:`${city}`, temp:`${response.main.temp}`, weather:`${response.weather[0].description}`});
          }
          catch(err){
            console.error('error', err.message);
          }
        };
      
        getWeatherWrapper();  
        
        
      }, [weather]);
    return (<div>
        <WeatherBox weatherdata={weather}/>
    </div>)

  }

export default WeatherComponent;