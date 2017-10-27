import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class HeaderNav extends Component {
  render() {
    const { currentUser, usersHouse, signOut, leaveHouse } = this.props;
    const userStuff = <div className='user-stuff'>
      <p className='greeting'>{`Welcome to ${usersHouse.houseName},  ${currentUser.name}.`}</p>
      <button onClick={() => { leaveHouse(currentUser, usersHouse); }}>Leave House</button>
      <button onClick={signOut}>Sign Out</button>
    </div>;
    return (
      <div>
        <Link to="/">
          <h1>Tribe</h1>
        </Link>
        <h3>A Communal Living Management App</h3>
        {usersHouse.houseName ? userStuff : null}
        <div>
          <Link to="/summary">House Summary</Link>
          <Link to="/bulletins">House Bulletins</Link>
          <Link to="/bills">House Bills</Link>
          <Link to="/chores">House Chores</Link>
          <Link to="/bills/user">My Bills</Link>
          <Link to="/chores/user">My Chores</Link>
          <div className='leave-house-div' onClick={() => { leaveHouse(currentUser, usersHouse); }}>Leave House</div>
          <div className='signout-div' onClick={signOut}>Sign Out</div>
        </div>
      </div>
    );
  }
}

export default HeaderNav;

HeaderNav.propTypes = {
  currentUser: PropTypes.object,
  usersHouse: PropTypes.object,
  signOut: PropTypes.func,
  leaveHouse: PropTypes.func
};
