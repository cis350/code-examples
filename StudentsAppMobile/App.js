import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
// import react navigation container
import { NavigationContainer } from '@react-navigation/native';
// import navigation stack constructor
import  { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import FilterableStudentsTable from './components/FilterableStudentsTable';

function HomeScreen({ navigation }) {
  
  
 
  return (
    <View style={styles.container}>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
    
  );
}

// create a navigation stack
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Roster" component={FilterableStudentsTable} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
