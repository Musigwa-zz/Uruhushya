import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { withTheme } from 'react-native-paper';
import LoginScreen from '../../screens/Authentication/Login';
import SignUp from '../../screens/Authentication/SignUp';
import { LOGIN, SIGN_UP } from '../../constants/routeNames';
import { store } from '../../redux/store';

const Stack = createStackNavigator();

const AuthRoute = () => {
  const {
    userData: { user },
  } = store.getState();
  const initialRouteName = !user.phone ? LOGIN : SIGN_UP;
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name={LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SIGN_UP}
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(AuthRoute);
