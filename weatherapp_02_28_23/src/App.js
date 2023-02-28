/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  BrowserRouter as Router, Link, Route, Routes,
} from 'react-router-dom';
import WeatherComponent from './components/WeatherComponent';
import LoginComponent from './components/LoginComponent';
import TypedCityComponent from './components/TypedCityComponent';

function WeatherApp() {
  const cities = ['Philadelphia', 'Boston', 'Mumbai', 'Dakar', 'Shanghai', 'London', 'Montreal', 'Paris'];

  return (
    <Router>
      <div>
        <section>
          <h1>Cities</h1>
          <nav>
            <ul>
              {cities.map((loc) => (
                <li key={loc}><Link to={`/weather/${loc}`}>{loc}</Link></li>
              ))}
              <li key="typed"><Link to="/custom/">Enter a city</Link></li>
            </ul>
          </nav>

          <article>
            <Routes>
              <Route path="/weather/:city" element={<WeatherComponent />} />
              <Route path="/" element={<LoginComponent />} />
              <Route path="/custom/" element={<TypedCityComponent />} />
            </Routes>
          </article>
        </section>
      </div>
    </Router>
  );
}

export default WeatherApp;
