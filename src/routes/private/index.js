import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { withTheme } from 'react-native-paper';
import {
  HOME,
  REQUEST,
  PASS_FRAME2,
  INFO,
  PROFILE,
} from '../../constants/routeNames';
import HomeScreen from '../../screens/Home';
import InfoScreen from '../../screens/Info';
import PassRequest from '../../screens/PassRequest/index';
import Frame2 from '../../screens/PassRequest/Frame2';
import Profile from '../../screens/Profile';

const Stack = createStackNavigator();

const HomeRoute = ({ theme }) => {
  const { colors } = theme;
  const headerOptions = {
    title: null,
    headerStyle: { backgroundColor: colors.primary },
    headerTintColor: colors.secondary,
  };
  return (
    <Stack.Navigator initialRouteName={HOME}>
      <Stack.Screen
        name={HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={INFO}
        component={InfoScreen}
        options={{ ...headerOptions, title: "Ubutumwa bw'ingenzi" }}
      />
      <Stack.Screen
        name={PROFILE}
        component={Profile}
        options={{ ...headerOptions, title: 'Imyirondoro' }}
      />
      <Stack.Screen
        name={REQUEST}
        component={PassRequest}
        options={{ ...headerOptions, title: "Amakuru y'urugendo" }}
      />
      <Stack.Screen
        name={PASS_FRAME2}
        component={Frame2}
        options={{
          title: 'Andi makuru',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.secondary,
        }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(HomeRoute);
