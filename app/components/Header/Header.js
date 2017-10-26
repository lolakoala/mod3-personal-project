import React, { Component } from 'react';
//redirect for signout button
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//on leave house, overwrite user and house in DB and empty in store
class Header extends Component {
  render() {
    const { currentUser, usersHouse, signOut, leaveHouse } = this.props;
    const userStuff = <div>
      <p>{`Welcome to ${usersHouse.houseName},  ${currentUser.name}.`}</p>
      <button onClick={() => { leaveHouse(currentUser, usersHouse); }}>Leave House</button>
      <button onClick={signOut}>Sign Out</button>
    </div>;
    return (
      <div>
        <Link to="/">
          <h1>Tribe</h1>
        </Link>
        <p>A Communal Living Management App</p>
        {currentUser.name ? userStuff : null}
      </div>
    );
  }
}

export default Header;

Header.propTypes = {
  currentUser: PropTypes.object,
  usersHouse: PropTypes.object,
  signOut: PropTypes.func,
  leaveHouse: PropTypes.func
};
