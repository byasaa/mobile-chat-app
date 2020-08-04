import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './src/routes/Navigator';
import {Provider} from 'react-redux';
import storage from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
const {store, persistor} = storage;

import {Root} from 'native-base';
const App = () => (
  <Root>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  </Root>
);

export default App;
