import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import HomeScreen from './screens/HomeScreen';
import UserDashboard from './screens/UserDashboard';
import EventDetails from './screens/EventDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Register" component={Register} /> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Event-details" component={EventDetails} />
        <Stack.Screen name="User" component={UserDashboard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

