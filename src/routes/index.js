import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthRoute from './public';

import Home from './private';
import { APP, AUTH } from '../constants/routeNames';
import { store } from '../redux/store';

const Stack = createStackNavigator();

export default () => {
  const { user } = store.getState().userData;
  const initialRouteName = user.registered ? APP : AUTH;
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName={initialRouteName}>
      <Stack.Screen
        name={AUTH}
        component={AuthRoute}
        options={{ title: null }}
      />
      <Stack.Screen name={APP} component={Home} options={{ title: null }} />
    </Stack.Navigator>
  );
};
