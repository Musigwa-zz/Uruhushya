import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import store from './redux/store';
import AppContainer from './routes';
import themes from './assets/themes';

YellowBox.ignoreWarnings(['Require cycle:']);

export default () => (
  <Provider store={store}>
    <PaperProvider theme={themes}>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </PaperProvider>
  </Provider>
);
