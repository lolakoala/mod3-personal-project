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
// import UserListContainer from './containers/UserListContainer.js';
// //HouseList will be reusable for archive lists- bulletins, bills, chores
// import HouseListContainer from './containers/HouseListContainer.js';
// //AddItem will be reusable for bulletins, bills, chores
import AddItemContainer from '../containers/AddItemContainer.js';
// import AddItem from './AddItem/AddItem.js';
// //Item will be reusable for bulletin, bill, chore
// import ItemContainer from './containers/ItemContainer.js';

export default class Routes extends Component {

  render() {
    //grab user name/id for routing specific to user
    // const { name } = this.props.currentUser ;
    return (
      <div className="routes">
        <Route path="/" component={ HeaderNavContainer }/>
        <Route exact path="/" component={ DashContainer }/>
        <Route path="/addbill" component={ AddItemContainer }/>
        {/* {["/login", "/signup"].map(route => <Route key={route} path={route} component={ LogInContainer }/>)}
        {["/bulletins", "/bills", "/chores"].map(route => <Route key={route} exact path={route} component={ HouseListContainer }/>)}
        {[`/bills/user`, `/chores/user`].map(route => <Route key={route} path={route} component={ UserListContainer }/>)}
        {["/bulletins/add", "/bills/add", "/chores/add"].map(route => <Route key={route} path={route} component={ AddItemContainer }/>)}
        {/* look up dynamic routing from unicorn/puppy demo code */}
        {/* <Route path="/bulletins:id" component={ ItemContainer }/>
        <Route path="/bills/:id" component={ ItemContainer }/>
        <Route path="/chores/:id" component={ ItemContainer }/> */}

      </div>
    );
  }
}

Routes.propTypes = {
  currentUser: PropTypes.object
};
