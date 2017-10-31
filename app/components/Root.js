import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.jsx';
import Devtools from '../containers/Devtools';
import { BrowserRouter } from 'react-router-dom';

export default class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes />
          <Devtools />
        </div>
      </BrowserRouter>
    );
  }
}
