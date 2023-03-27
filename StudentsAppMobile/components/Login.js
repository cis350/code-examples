import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
// import api functions
import { getAllStudents } from '../api/students';

function Login({navigation}) {
  // add a state to the component
  const login = useRef(false);
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
      setStudents(response);
      // return response;
    }
    // run the wrapper function

    getAllStudentsWrapper();


  },[students.length]); // dependency list
  // button click event handler.
  const handleLogin = () => {
    // update login
    login.current = !login.current;
     // navigate to the Table screen
     navigation.navigate('Roster', {
      roster: students,
    });
  };
  // input change event handler
  const handleChange = (e) => {
    name.current = e; // update the reference
  };
  // conditional rendering
  if (login.current === false) {
    return (
      <View style={styles.container}>
        <Text>Name: </Text>
      <TextInput style={styles.input} 
      onChangeText={((e) => handleChange(e))}
      />
      <Button
       title='Start'
       onPress={handleLogin}
      />
    </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Hello {name}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default Login;
