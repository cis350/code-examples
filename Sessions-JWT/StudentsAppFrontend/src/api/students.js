// HTTP client
import axios from "axios";
import { rootURL } from "../utils/utils";
/**
 * This module contains HTTP calls to the backend
 */

/**
 * get all the students from the backend
 */
export const getAllStudents = async () =>{
    // always use try/catch in an async function
    try{
        const response = await axios.get(`${rootURL}/students`);
        console.log("all students", response.data);
        return response.data.data;

    }catch (err){
        console.error('error', err.message);
    }
}

/**
 * Get a student by their id
 */

export const getStudentById = async (id) =>{
    // always use try/catch in an async function
    try{
        const response = await axios.get(`${rootURL}/student/${id}`);
        console.log("A student", response.data);
        return response.data.data;

    }catch (err){
        console.error('error', err.message);
    }
}

/**
 * Create a new student
 */

export const createNewStudent = async (studentObject) =>{
    // always use try/catch in an async function
    try{
        const response = await axios.post(`${rootURL}/student`,
            `name=${studentObject.name}&email=${studentObject.email}&major=${studentObject.major}`);
        console.log("A response", response.data);
        return response.data.data;

    }catch (err){
        console.error('error', err.message);
    }
}