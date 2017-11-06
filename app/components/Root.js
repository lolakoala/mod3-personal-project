import React, {Component} from 'react';
import Routes from './Routes.jsx';
import { BrowserRouter } from 'react-router-dom';

export default class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}
