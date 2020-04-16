import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  HOME_SCREEN,
  PASS_REQUEST,
  PASS_FRAME2,
} from '../../constants/routeNames';
import { withTheme } from 'react-native-paper';
import HomeScreen from '../../screens/Home';
import PassRequest from '../../screens/PassRequest/index';
import Frame2 from '../../screens/PassRequest/Frame2';

const Stack = createStackNavigator();

const HomeRoute = ({ theme }) => {
  const { colors } = theme;
  return (
    <Stack.Navigator initialRouteName={HOME_SCREEN}>
      <Stack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={PASS_REQUEST}
        component={PassRequest}
        options={{
          title: null,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name={PASS_FRAME2}
        component={Frame2}
        options={{
          title: null,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(HomeRoute);
