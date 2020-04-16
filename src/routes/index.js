import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthRoute from './public';
import Home from './private';
import { APP, AUTH, ONBOARDING } from '../constants/routeNames';
import Onboarding from '../screens/Onboarding';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName={ONBOARDING}>
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
