import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthRoute from './public';
import Home from './private';
import { APP, AUTH, ONBOARDING, SPLASH } from '../constants/routeNames';
import Onboarding from '../screens/Onboarding';
import Splash from '../screens/Loading';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{ header: () => null }}
    initialRouteName={ONBOARDING}>
    <Stack.Screen name={SPLASH} component={Splash} options={{ title: null }} />
    <Stack.Screen
      name={ONBOARDING}
      component={Onboarding}
      options={{ title: null }}
    />
    <Stack.Screen name={AUTH} component={AuthRoute} options={{ title: null }} />
    <Stack.Screen name={APP} component={Home} options={{ title: null }} />
  </Stack.Navigator>
);
