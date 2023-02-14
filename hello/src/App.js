import './App.css';
import { useState, useRef } from 'react';

function App() {
  // add a state to the component
  const [login, setLogin] = useState(false);
  let name = useRef(''); // reference, its value persists  between rendering
  // button click event handler. 
  const handleClick = (e) =>{
    // update the login state
    setLogin(!login);
    console.log('value', e.target.value);
  }
  // input change event handler
  const handleChange = (e) =>{
    name.current = e.target.value;
    console.log('value', e.target.value);
  }
  // conditional rendering
  if(login === false){
  return (
    <div className="App">
      <label> Name: 
        <input type="text" name='name' onChange={handleChange}/>
      </label>
      <button type='button' onClick={handleClick}>Login</button>
    </div>
  );
  }
  else{
    return (
      <div className="App">
        <label> Welcome  
          {name.current}
        </label>
        <button type='button' onClick={handleClick}>Logout</button>
      </div>
    );

  }
}

export default App;
