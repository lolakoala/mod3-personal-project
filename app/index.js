import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes';
import Devtools from './containers/Devtools';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import store from './reducers/configureStore.js';
// require('./main.scss');

ReactDOM.render(
  // <Provider store={store}>
    <BrowserRouter>
      <div>
        <Routes />
        <Devtools />
      </div>
    </BrowserRouter>,
  // </Provider>,
  document.getElementById('main')
);
