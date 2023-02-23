import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import WeatherComponent from './components/WeatherComponent';

function WeatherApp() {
  const cities = ['Philadelphia', 'Boston', 'Mumbai', 'Dakar', 'Shanghai', 'London', 'Montreal'];
 
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
            </ul>
          </nav>

          <article>
          
          <Route path="/weather/:city" render={() => (<WeatherComponent />)} />
            <Route path="/login" render={() => (<LoginComponent />)} />
          </article>
        </section>
      </div>
    </Router>
  );
}


export default WeatherApp;
