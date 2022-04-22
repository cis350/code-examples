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

export const verifySession = async (userToken) =>{
    try{
        if(userToken.length > 0){
            const response = await axios.post(`${domain}/verify`, `token=${userToken}`);
            return response.status;
        }
    }
    catch(err){
        // console.error(err);
        return 302; // return 302
    }
}

export const getUsers = async () =>{
    try{
            const response = await axios.get(`${domain}/users`);
            return response.data.data;
    }
    catch(err){
        return 'error'; // return  error
    }
}