import { React, useState, useRef } from 'react';
import Questions from './Questions';
import '../assets/App.css';
import questionsList from '../assets/questions.json'

function App() {
  // initiatize state, the game hasnt started yet
  const [, setStarted] = useState(false);
  //keep track of the state of the game (started or not)
  const start = useRef(false);

  function handleStart(){
    setStarted(true); //update the state
    //update start
    start.current = true;
  }
  if(!start.current){
    return (
      <div>
        <button type="submit" onClick={handleStart}>Start</button>
        </div>
      );
  }
return (
<div>
  <Questions  questionslist={questionsList}/>
  </div>
);

}

export default App;
