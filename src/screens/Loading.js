import React from 'react';
import { store } from '../redux/store';
import { ONBOARDING, APP } from '../constants/routeNames';
import Loading from '../components/Containers/splash';

export default ({ navigation }) => {
  const { userData: { user } = {} } = store.getState();
  const navigator = () => {
    if (user.registered === false && !user.phone) {
      navigation.navigate(ONBOARDING);
    } else if (user.registered === true) {
      navigation.navigate(APP);
    }
  };
  setTimeout(navigator, 2000);
  return <Loading />;
};
