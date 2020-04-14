import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../screens/authentication/Login';
import SignUp from '../../screens/authentication/SignUp';
import Onboarding from '../../screens/Onboarding';
import { LOGIN, SIGN_UP, ONBOARDING } from '../../constants/routeNames';
import { withTheme } from 'react-native-paper';
import store from '../../redux/store';

const Stack = createStackNavigator();

const AuthRoute = ({ theme }) => {
  return (
    <Stack.Navigator initialRouteName={LOGIN}>
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
