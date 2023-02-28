// import './App.css';
import React, { useState, useRef } from 'react';

function LoginComponent() {
  // add a state to the component
  const [login, setLogin] = useState(false);
  const name = useRef(''); // reference, its value persists  between rendering
  // button click event handler.
  const handleClick = (e) => {
    // update the login state
    setLogin(!login);
    console.log('value', e.target.value);
  };
  // input change event handler
  const handleChange = (e) => {
    name.current = e.target.value; // update the reference
    console.log('value', e.target.value);
  };
  // conditional rendering
  if (login === false) {
    return (
      <div className="App">
        <label htmlFor="a">
          {' '}
          Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <button type="button" onClick={handleClick}>Login</button>
      </div>
    );
  }

  return (
    <div className="App">
      <label htmlFor="a">
        {' '}
        Welcome
        {name.current}
      </label>
    </div>
  );
}

export default LoginComponent;
