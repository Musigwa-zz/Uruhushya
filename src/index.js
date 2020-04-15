import React from 'react';
import { YellowBox, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import AppContainer from './routes';
import themes from './assets/themes';
import DropdownAlert from 'react-native-dropdownalert';
import { setAlertRef } from './components/Alerts';

YellowBox.ignoreWarnings(['Require cycle:', 'Animated:']);

export default () => (
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <PaperProvider theme={themes}>
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
        <DropdownAlert
          // renderImage={() => null}
          messageStyle={{
            textAlign: 'center',
            fontSize: 14,
            paddingVertical: 5,
            color: 'white',
          }}
          renderTitle={() => null}
          // errorColor={colors.error}
          // infoColor={colors.primaryLight}
          ref={(ref) => setAlertRef(ref)}
          updateStatusBar={false}
          onClose={() => StatusBar.setHidden(false)}
        />
      </PaperProvider>
    </Provider>
  </PersistGate>
);
