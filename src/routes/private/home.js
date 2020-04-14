import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PASS_REQUEST } from '../../constants/routeNames';
import { withTheme } from 'react-native-paper';
import PassRequest from '../../screens/PassRequest';

const Stack = createStackNavigator();

const HomeRoute = ({ theme }) => {
  return (
    <Stack.Navigator initialRouteName={PASS_REQUEST}>
      <Stack.Screen
        name={PASS_REQUEST}
        component={PassRequest}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(HomeRoute);
