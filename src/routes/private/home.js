import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PASS_REQUEST, PASS_FRAME2 } from '../../constants/routeNames';
import { withTheme } from 'react-native-paper';
import PassRequest from '../../screens/PassRequest';
import Frame2 from '../../screens/PassRequest/Frame2';

const Stack = createStackNavigator();

const HomeRoute = ({ theme }) => {
  return (
    <Stack.Navigator initialRouteName={PASS_REQUEST}>
      <Stack.Screen
        name={PASS_REQUEST}
        component={PassRequest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={PASS_FRAME2}
        component={Frame2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(HomeRoute);
