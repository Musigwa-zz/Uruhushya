import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../screens/authentication/Login';
import VerifyScreen from '../../screens/authentication/Verification';
import Onboarding from '../../screens/Onboarding';
import { LOGIN, VERIFICATION, ONBOARDING } from '../../constants/routeNames';
import { withTheme } from 'react-native-paper';

const Stack = createStackNavigator();

const AuthRoute = ({ theme }) => {
  const { colors } = theme;
  return (
    <Stack.Navigator initialRouteName={ONBOARDING}>
      <Stack.Screen
        name={LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ONBOARDING}
        component={Onboarding}
        options={{ title: null, headerShown: false }}
      />
      <Stack.Screen
        name={VERIFICATION}
        component={VerifyScreen}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          title: null,
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(AuthRoute);
