import React, {useState} from "react";
import { StyleSheet, View, Button} from 'react-native';
// import the table of students
import StudentsTable from "./StudentsTable"
import SearchBar from "./SearchBar";


// separator
const Separator = () => <View style={styles.separator} />;


function FilterableStudentsTable({ route, navigation }){
    // lifted state the search term 
    const [major, setMajor] = useState('');
    // retrieve the props
    let { roster } = route.params;

 return (
    <View style={styles.container}>
        <SearchBar setMajor={setMajor} />      
        <Separator />
        <StudentsTable major={major} students={roster}/>
        <Separator />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Separator />
        <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
        <Separator />
        <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
  });

export default FilterableStudentsTable;