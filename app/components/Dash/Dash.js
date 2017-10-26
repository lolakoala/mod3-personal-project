import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../../../firebase.js';

class Dash extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  logout = () => {

  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.user ?
          <button onClick={this.logout}>Log Out</button>
          :
          <button onClick={this.login}>Log In</button>
        }
      </div>

    );
  }

}

export default Dash;

Dash.propTypes = {

};
