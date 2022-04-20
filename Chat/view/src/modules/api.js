import axios from 'axios';
const domain ='http://localhost:8080';

// joinChat takes the username as a parameter
// and sends it to the server. And return the JWT
export const joinChat = async (username) =>{
    try{
        if(username.length > 0){
            const response = await axios.post(`${domain}/join`, `username=${username}`);
            return response.data.token;
        }
    }
    catch(err){
        console.error(err);

    }
}