import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

//Login will be for login and signup
// import LogInContainer from './containers/LogInContainer.js';
// import Nav from './Nav/Nav.js';
import DashContainer from '../containers/DashContainer.js';
//HeaderNav appears at top of every page and displays user and house when applicable
import HeaderNavContainer from '../containers/HeaderNavContainer.js';
// //UserList will be reusable for any list of things specific to one use i.e. "my chores"
import UserListContainer from '../containers/UserListContainer.js';
// //HouseList will be reusable for archive lists- bulletins, bills, chores
import HouseListContainer from '../containers/HouseListContainer.js';
// //AddItem will be reusable for bulletins, bills, chores
import AddItemContainer from '../containers/AddItemContainer.js';
// import AddItem from './AddItem/AddItem.js';
// //Item will be reusable for bulletin, bill, chore
import ItemContainer from '../containers/ItemContainer.js';

const Routes = ({ usersHouse }) => {


  // const { usersHouse } = this.props;
  // console.log('props', this.props)
  //grab user name/id for routing specific to user
  // const { name } = this.props.currentUser ;
  return (
    <div className="routes">
      <Route path="/" component={ HeaderNavContainer }/>
      <Route exact path="/" component={ DashContainer }/>
      <Route path="/additem" component={ AddItemContainer }/>
      <Route exact path='/houselist' component={ HouseListContainer }/>

      <Route path='/bills/:id' component={ ItemContainer }/>
      <Route exact path='/userlist' component={ UserListContainer }/>

    </div>
  );

};

export default Routes;

Routes.propTypes = {
  usersHouse: PropTypes.object
};
