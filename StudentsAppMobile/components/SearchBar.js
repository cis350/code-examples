import React from "react";
import { StyleSheet, View, TextInput } from 'react-native';

function SearchBar(props) {
    const handleOnChange = (e) =>{
        props.setMajor(e);
    }

    return(
        <View>
            <TextInput style={styles.input} 
                onChangeText={handleOnChange}
            />
        </View>
    )
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
export default SearchBar;