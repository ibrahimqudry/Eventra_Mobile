import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import HomeScreen from './screens/HomeScreen';
import UserDashboard from './screens/UserDashboard';
import EventDetails from './screens/EventDetails';
import EventsScreen from './screens/EventsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import AccountSettings from './screens/AccountSettings';
import { store } from './redux/store';
import SavedEventsScreen from './screens/SavedEventsScreen';
import PreviousEventPage from './screens/PreviousEventPage';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Event" component={EventsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="event-details" component={EventDetails} />
        <Stack.Screen name="User" component={UserDashboard}/>
        <Stack.Screen name="Notifications" component={NotificationsScreen}/>
        <Stack.Screen name="Account" component={AccountSettings} />
        <Stack.Screen name="savedEvents" component={SavedEventsScreen} />
        <Stack.Screen name="PreviousEventPage" component={PreviousEventPage} />
      </Stack.Navigator>
    </NavigationContainer>

    </Provider>
  );
}

