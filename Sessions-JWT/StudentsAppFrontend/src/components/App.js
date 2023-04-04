import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import FilterableStudentsTable from './FilterableStudentsTable';
import AddStudent from './AddStudent';
// import api functions
import { getAllStudents } from '../api/students';

function App() {
  // add a state to the component
  const [login, setLogin] = useState(false);
  const name = useRef(''); // reference, its value persists  between rendering
  
  // lifted state: the list of student
  // we will pass the mutator function as prop
  // to the AddStudent component
  const [students, setStudents] = useState([]);

  

  // load data from the backend inside useEffect
  useEffect(()=>{
    
    // wrapper function
    async function getAllStudentsWrapper(){
      // get all students
      let response = await getAllStudents();
      console.log('All students', response);
      // response = await getStudentById(5);
      // console.log('Student with id 5', response);
      setStudents(response);
      // return response;
    }
    // run the wrapper function

    getAllStudentsWrapper();


  },[students.length]); // dependency list
  // button click event handler.
  const handleClick = (e) => {
    // update the login state
    setLogin(!login);
    console.log('value', e.target.value);
  };
  // input change event handler
  const handleChange = (e) => {
    name.current = e.target.value; // update the reference
    console.log('value', e.target.value);
  };
  // conditional rendering
  if (login === false) {
    return (
      <div className="App">
        <label>
          {' '}
          Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <button type="button" onClick={handleClick}>Login</button>
      </div>
    );
  }

  return (
    <div className="App">
      <label>
        {' '}
        Welcome
        {name.current}
      </label>
      <AddStudent students={students} addNewStudent={setStudents}/>
      <FilterableStudentsTable students={students}/>
      <button type="button" onClick={handleClick}>Logout</button>
    </div>
  );
}

export default App;
