import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../../firebase.js';

class Dash extends Component {


  logout = () => {

  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.props.loginSuccess(user);
      });
  }

  render() {
    return (
      <div>
        {this.props.currentUser.name ?
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
  currentUser: PropTypes.object,
  loginSuccess: PropTypes.func
};
