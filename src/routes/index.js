import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthRoute from './public';
import Home from './private';
import { APP, AUTH, ONBOARDING } from '../constants/routeNames';
import Onboarding from '../screens/Onboarding';
import { store } from '../redux/store';

const Stack = createStackNavigator();

export default () => {
  const {
    userData: { user },
  } = store.getState();
  let initialRouteName = AUTH;
  if (user.registered === false && !user.phone) {
    initialRouteName = ONBOARDING;
  } else if (user.registered === true) {
    initialRouteName = APP;
  }
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName={initialRouteName}>
      <Stack.Screen
        name={ONBOARDING}
        component={Onboarding}
        options={{ title: null }}
      />
      <Stack.Screen
        name={AUTH}
        component={AuthRoute}
        options={{ title: null }}
      />
      <Stack.Screen name={APP} component={Home} options={{ title: null }} />
    </Stack.Navigator>
  );
};
