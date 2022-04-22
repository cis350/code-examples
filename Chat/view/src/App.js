import {useRef, useEffect, useState} from 'react';
import { joinChat, verifySession, getUsers } from './modules/api';

function App() {
  let username = useRef('');
  let chatUsers = useRef([]);
  // state is the number of connectes users
  const [numUsers, setNumUsers] = useState(0);

  // fetch the list of connected users inside useEffect
  useEffect(() =>{
    async function fetchUsers(){
      chatUsers.current = await getUsers();
      // update the state 
      setNumUsers(chatUsers.current.length);
      console.log('users', chatUsers.current);
    }
    // we want to fetch the users frequently (30 s)
    //we will use server polling with setInterval
    setInterval(() => fetchUsers(), 10000);
    //fetchUsers();
  },[numUsers]);


  // if there is a token. we validate the session.
  // otherwise we request a new token
  async function authenticate(e){
    e.preventDefault();
    if(sessionStorage.getItem('token') === null)  {
      // get the web token from the server
      const token = await joinChat(username.current);
      //store token in session storage
      sessionStorage.setItem('token', token);
    }
    else{
      // retrieve the token
      const userToken = sessionStorage.getItem('token');
      // we validate the session
      const code = await verifySession(userToken);
      if(code === 200){
        console.log('session', 'valid');
      }
      if(code === 302){
        console.log('session', 'expired');
        // update a state that will take the user back to
        // the home/login page
      }
    }
  }

  return (
    <div>
      <h2>Enter your username</h2>
      <input type="text" onChange={(e) => username.current = e.target.value}/>
      <button type="button" onClick={(e) => authenticate(e)}>Join the Chat</button>
       <hr />
       <ConnectedUsers users={chatUsers.current}/> 
    </div>
  );
}


// connected user component
function ConnectedUsers(props) {
  return(
    <div>
      <h2>Connected Users</h2>
      <div>
        <ul>{props.users.map(user => <li key={user}>{user}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
