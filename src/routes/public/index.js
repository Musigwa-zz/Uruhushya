import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { withTheme } from 'react-native-paper';
import LoginScreen from '../../screens/Authentication/Login';
import SignUp from '../../screens/Authentication/SignUp';
import Onboarding from '../../screens/Onboarding';
import { LOGIN, SIGN_UP, ONBOARDING } from '../../constants/routeNames';
import { store } from '../../redux/store';

const Stack = createStackNavigator();

const AuthRoute = ({ theme }) => {
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
      <Stack.Screen
        name={ONBOARDING}
        component={Onboarding}
        options={{ title: null, headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(AuthRoute);
