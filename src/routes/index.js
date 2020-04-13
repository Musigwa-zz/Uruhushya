import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthRoute from './public';

import Home from './private/home';
import { APP, AUTH } from '../constants/routeNames';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{ header: () => null }}
    initialRouteName={AUTH}>
    <Stack.Screen name={AUTH} component={AuthRoute} options={{ title: null }} />
    <Stack.Screen name={APP} component={Home} options={{ title: null }} />
  </Stack.Navigator>
);
