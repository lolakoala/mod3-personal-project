import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { Provider } from 'react-redux';
import store from './reducers/configureStore.js';

ReactDOM.render(
  <Provider store={store}>
    <Root store={store}/>
  </Provider>,
  document.getElementById('main')
);
