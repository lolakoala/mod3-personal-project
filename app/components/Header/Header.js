import React, { Component } from 'react';
//redirect for signout button
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//header displays- app title, user, house, signout button

class Header extends Component {
  render() {
    const { currentUser, usersHouse } = this.props;
    const userStuff = <div>
      <p>{`Welcome to ${usersHouse.houseName},  ${currentUser.name}.`}</p>
      <button>Sign Out</button>
    </div>;
    return (
      <div>
        <h1>Tribe</h1>
        <p>A Communal Living Management App</p>
        {currentUser.name ? userStuff : null}
      </div>
    );
  }
}

export default Header;

Header.propTypes = {
  currentUser: PropTypes.object,
  usersHouse: PropTypes.object
};
