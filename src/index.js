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
import Icon from './components/Icons';

YellowBox.ignoreWarnings(['Require cycle:', 'Animated:']);

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <PaperProvider theme={themes}>
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
        <DropdownAlert
          messageStyle={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            lineHeight: 24,
            color: themes.colors.secondary,
          }}
          renderCancel={() => (
            <Icon
              style={{ alignSelf: 'center' }}
              name="close"
              color={themes.colors.secondary}
              size={24}
              type="antDesign"
            />
          )}
          tapToCloseEnabled
          showCancel
          cancelBtnImageStyle={{ alignSelf: 'flex-start' }}
          ref={(ref) => setAlertRef(ref)}
          updateStatusBar
          closeInterval={20000}
        />
      </PaperProvider>
    </PersistGate>
  </Provider>
);
