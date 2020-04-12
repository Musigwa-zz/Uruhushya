import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../screens/authentication/Login';
import VerifyScreen from '../../screens/authentication/Verification';
import Onboarding from '../../screens/Onboarding';
import { LOGIN, VERIFICATION, ONBOARDING } from '../../constants/routeNames';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{ header: () => null }}
    initialRouteName={ONBOARDING}>
    <Stack.Screen
      name={LOGIN}
      component={LoginScreen}
      options={{ title: null }}
    />
    <Stack.Screen
      name={ONBOARDING}
      component={Onboarding}
      options={{ title: null }}
    />
    <Stack.Screen
      name={VERIFICATION}
      component={VerifyScreen}
      options={{ title: null }}
    />
  </Stack.Navigator>
);
