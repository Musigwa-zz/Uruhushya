import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import AppContainer from './routes';
import themes from './assets/themes';

YellowBox.ignoreWarnings(['Require cycle:', 'Animated:']);

export default () => (
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <PaperProvider theme={themes}>
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  </PersistGate>
);
