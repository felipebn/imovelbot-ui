import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './state/configureStore';
import { setupListeners } from './websocket/socket';

const store = configureStore();

setupListeners(store)

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('root'));

registerServiceWorker();



