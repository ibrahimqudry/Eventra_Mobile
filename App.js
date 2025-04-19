import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import HomeScreen from './screens/HomeScreen';
import EventsScreen from './screens/EventsScreen';
import EventDetails from './screens/EventDetails';
import Services from './screens/Services';
import UserDashboard from './screens/UserDashboard';

import TestPayment from './screens/TestPayment';
import Paypal from './screens/Paypal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TestPayment"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Event" component={EventsScreen} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="user" component={UserDashboard} />
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* شاشات الدفع */}
        <Stack.Screen name="TestPayment" component={TestPayment} />
        <Stack.Screen name="Paypal" component={Paypal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
