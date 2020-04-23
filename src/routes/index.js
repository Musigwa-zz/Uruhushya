/* eslint-disable no-nested-ternary */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { APP, ONBOARDING, LOGIN, SIGN_UP } from '../constants/routeNames';
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Authentication/Login';
import SignUp from '../screens/Authentication/SignUp';
import App from './private';

const Stack = createStackNavigator();

const AppNavigator = ({ user }) => {
  SplashScreen.hide();
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName={ONBOARDING}>
      {user.registered ? (
        <Stack.Screen name={APP} component={App} options={{ title: null }} />
      ) : user.phone ? (
        <Stack.Screen
          name={SIGN_UP}
          component={SignUp}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          {/* <Stack.Screen
            name={ONBOARDING}
            component={Onboarding}
            options={{ title: null }}
          /> */}
          <Stack.Screen
            name={LOGIN}
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = ({ userData }) => ({ user: userData.user });

export default connect(mapStateToProps, {})(AppNavigator);
