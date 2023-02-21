import './App.css';
import React, { useState, useRef } from 'react';
import FilterableStudentsTable from './FilterableStudentsTable';
import AddStudent from './AddStudent';

function App() {
  // add a state to the component
  const [login, setLogin] = useState(false);
  const name = useRef(''); // reference, its value persists  between rendering
  
  // lifted state: the list of student
  // we will pass the mutator function as prop
  // to the AddStudent component
  const [students, setStudents] = useState([]);


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
