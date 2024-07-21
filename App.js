/* eslint-disable react/react-in-jsx-scope */
import 'react-native-gesture-handler';
import configureStore from './redux/store';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/registration/Login';
import Signup from './src/registration/Signup';
import Home from './src/dashboard/Home';
// Store
const {store, persistor} = configureStore();

/**
 * RootApp
 * @returns
 */
const Stack = createStackNavigator();
const RootApp = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'Home' : 'Login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
