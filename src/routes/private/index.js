import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HOME_SCREEN, PASS_REQUEST_ROUTE } from '../../constants/routeNames';
import { withTheme } from 'react-native-paper';
import PassRequest from './request';
import HomeScreen from '../../screens/Home';

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
        name={PASS_REQUEST_ROUTE}
        component={PassRequest}
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
