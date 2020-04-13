import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SAVE_PROFILE, PASS_REQUEST } from '../../constants/routeNames';
import { withTheme } from 'react-native-paper';
import SaveProfile from '../../screens/SaveProfile';
import PassRequest from '../../screens/PassRequest';

const Stack = createStackNavigator();

const HomeRoute = ({ theme }) => {
  return (
    <Stack.Navigator initialRouteName={SAVE_PROFILE}>
      <Stack.Screen
        name={SAVE_PROFILE}
        component={SaveProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={PASS_REQUEST}
        component={PassRequest}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(HomeRoute);
