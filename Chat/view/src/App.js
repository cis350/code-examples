import {useRef} from 'react';
import { joinChat } from './modules/api';

function App() {
  let username = useRef('');

  async function authenticate(e){
    e.preventDefault();
    console.log(username.current);
    // get the web token from the server
    const token = await joinChat(username.current);
    //store token in session storage
    sessionStorage.setItem('token', token);
  }

  return (
    <div>
      <label>Enter your username</label>
      <input type="text" onChange={(e) => username.current = e.target.value}/>
      <button type="button" onClick={(e) => authenticate(e)}>Join the Chat</button>
        
    </div>
  );
}

export default App;
