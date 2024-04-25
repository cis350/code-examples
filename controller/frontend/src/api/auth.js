// HTTP client
import axios from "axios";
import { rootURL } from "./utils";
import { setHeaders } from "./utils";
/**
 * This module contains HTTP calls to
 * the /login and /logout endpoints
 */



/**
 * This function authenticates the user
 * sends a POSt request to the login endpoint
 * returns the JWT
 */
export const loginUser = async (username, password) => {
    try{
        // add JWT to headers
        setHeaders();
        const response = await axios.post(`${rootURL}/login`, `username=${username}&password=${password}`);
        // return the token
        return response.data.apptoken;
    } catch (err){
        console.log('error', err.message);
    }
}

export const logoutUser = async () => {
    try{
        // add JWT to headers
        setHeaders();
        const response = await axios.post(`${rootURL}/logout`);
        // return the token
        return response.status;
    } catch (err){
        console.log('error', err.message);
    }
}

