import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from './public';

import Home from './private/home';
import { APP, AUTH } from '../constants/routeNames';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{ header: () => null }}>
    <Stack.Screen name={AUTH} component={Auth} options={{ title: null }} />
    <Stack.Screen name={APP} component={Home} options={{ title: null }} />
  </Stack.Navigator>
);
