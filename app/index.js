import React from 'react';
import ReactDOM from 'react-dom';
import RoutesContainer from './containers/RoutesContainer';
import Devtools from './containers/Devtools';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducers/configureStore.js';
require('./main.scss');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <RoutesContainer />
        <Devtools />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('main')
);
