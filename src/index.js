import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import DropdownAlert from 'react-native-dropdownalert';
import { store, persistor } from './redux/store';
import AppContainer from './routes';
import themes from './assets/themes';
import { setAlertRef } from './components/Alerts';
import Splash from './components/Containers/splash';

YellowBox.ignoreWarnings(['Require cycle:', 'Animated:']);

export default () => (
  <Provider loading={<Splash />} store={store}>
    <PersistGate persistor={persistor}>
      <PaperProvider theme={themes}>
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
        <DropdownAlert
          messageStyle={{
            textAlign: 'center',
            fontSize: 14,
            paddingVertical: 5,
            color: themes.colors.secondary,
          }}
          renderTitle={() => null}
          ref={(ref) => setAlertRef(ref)}
          updateStatusBar={false}
          closeInterval={3000}
        />
      </PaperProvider>
    </PersistGate>
  </Provider>
);
