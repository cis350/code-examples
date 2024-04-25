// HTTP client
import axios from "axios";
import { rootURL } from "../utils/utils";
import { setHeaders } from "./utils";
/**
 * This module contains HTTP calls to API
 * users CRUD 
 */




/**
 * get all the users from the backend
 */
export const getAllUsers = async () =>{
    // always use try/catch in an async function
    try{
        const response = await axios.get(`${rootURL}/users`);
        console.log("all students", response.data);
        return response.data.data;

    }catch (err){
        console.error('error', err.message);
    }
}

/**
 * Get a user by their id
 */

export const getUserById = async (id) =>{
    // always use try/catch in an async function
    try{
        const response = await axios.get(`${rootURL}/user/${id}`);
        console.log("A user", response.data);
        return response.data.data;

    }catch (err){
        console.error('error', err.message);
    }
}

/**
 * Create a new user
 */

export const createNewUser = async (userObject) =>{
    // always use try/catch in an async function
    try{
        // add the token to the header
        setHeaders();
        const response = await axios.post(`${rootURL}/user`,
            `name=${userObject.name}&email=${userObject.email}&major=${userObject.major}`);
        console.log("A response", response.data);
        return response.data.data;

    }catch (err){
        console.error('error', err.message);
    }
}