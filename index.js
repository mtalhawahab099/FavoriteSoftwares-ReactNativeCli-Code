import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {store} from './src/store/store';
import {Provider} from 'react-redux';

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Root);
