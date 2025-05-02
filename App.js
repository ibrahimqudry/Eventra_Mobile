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
import NotificationsScreen from './screens/NotificationsScreen';
import AccountSettings from './screens/AccountSettings';
import SavedEventsScreen from './screens/SavedEventsScreen';
import PreviousEvents from './screens/PreviousEvents';
import TestPayment from './screens/TestPayment';
import ServiceDetails from './screens/ServiceDetails';
import Paypal from './screens/Paypal';
import { store } from './redux/store';
import { Provider } from 'react-redux';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Event" component={EventsScreen} />
          <Stack.Screen name="EventDetails" component={EventDetails} />
          <Stack.Screen name="Previous" component={PreviousEvents} />
          <Stack.Screen name="Services" component={Services} />
          <Stack.Screen name="ServiceDetails" component={ServiceDetails} />

          {/* User Profile Screen */}
          <Stack.Screen name="user" component={UserDashboard} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Account" component={AccountSettings} />
          <Stack.Screen name="savedEvents" component={SavedEventsScreen} />

          {/* شاشات الدفع */}
          <Stack.Screen name="TestPayment" component={TestPayment} />
          <Stack.Screen name="Paypal" component={Paypal} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
