import { React, useState, useRef } from 'react';
import Questions from './Questions';
// import '../assets/App.css';
import questionsList from '../assets/questions.json'

function App() {
  // initiatize state, the game hasnt started yet
  const [start, setStarted] = useState(false);
  //keep track of the state of the game (started or not)
  let username = useRef('');

  function handleStart(){
    setStarted(true); //update the state
    //update start
 
  }

function handleOnChange(e){
    username.current = e.target.value;
}

  if(!start){
    return (
      <div>
        <input type="text" onChange={handleOnChange}/>
        <button type="submit" onClick={handleStart}>Start</button>
        </div>
      );
  }
return (
<div>
  <Questions  questionslist={questionsList} player={username.current}/>
  </div>
);

}

export default App;
