import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../screens/Authentication/Login';
import SignUp from '../../screens/Authentication/SignUp';
import Onboarding from '../../screens/Onboarding';
import { LOGIN, SIGN_UP, ONBOARDING } from '../../constants/routeNames';
import { withTheme } from 'react-native-paper';

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
    </Stack.Navigator>
  );
};

export default withTheme(AuthRoute);
