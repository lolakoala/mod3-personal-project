import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class HeaderNav extends Component {
  isActive = url => {
    return this.props.location.pathname === url ? 'active' : '' ;
  }

  render() {
    const { currentUser, usersHouse, signOut, leaveHouse } = this.props;
    const userStuff = <div className='user-stuff'>
      <div className='user-stuff-nav'>
        <Link className={`home ${this.isActive('/')}`} to="/">Home</Link>
        <Link className={`manage-house ${this.isActive('/houselist')}`} to="/houselist">Manage House</Link>
        <Link className={`my-lists ${this.isActive('/userlist')}`} to="/userlist">My Lists</Link>
        <Link to='/' className='leave-house' onClick={() => { leaveHouse(currentUser, usersHouse); }}>Leave House</Link>
        <Link to='/' className='signout' onClick={signOut}>Sign Out</Link>
      </div>
      <p className='greeting'>{`Welcome to ${usersHouse.houseName},  ${currentUser.name}.`}</p>
    </div>;
    return (
      <div className='app-header'>
        <div className='logo'>
          <Link to="/">
            <h1>Tribe</h1>
          </Link>
          <h3>A Communal Living Management App</h3>
        </div>

        {usersHouse.houseName ? userStuff : null}
      </div>
    );
  }
}

export default HeaderNav;

HeaderNav.propTypes = {
  currentUser: PropTypes.object,
  usersHouse: PropTypes.object,
  signOut: PropTypes.func,
  leaveHouse: PropTypes.func,
  location: PropTypes.object
};
