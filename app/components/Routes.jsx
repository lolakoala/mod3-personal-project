import React from 'react';
import { Route } from 'react-router-dom';
import DashContainer from '../containers/DashContainer.js';
import HeaderNavContainer from '../containers/HeaderNavContainer.js';
import UserListContainer from '../containers/UserListContainer.js';
import HouseListContainer from '../containers/HouseListContainer.js';
import AddItemContainer from '../containers/AddItemContainer.js';
import BillContainer from '../containers/BillContainer.js';
import BulletinContainer from '../containers/BulletinContainer';

const Routes = () => {
  return (
    <div className="routes">
      <Route path="/" component={ HeaderNavContainer }/>
      <Route exact path="/" component={ DashContainer }/>
      <Route path="/additem" component={ AddItemContainer }/>
      <Route exact path='/houselist' component={ HouseListContainer }/>
      <Route path='/bills/:id' component={ BillContainer }/>
      <Route path='/bulletins/:id' component={ BulletinContainer }/>
      <Route exact path='/userlist' component={ UserListContainer }/>
    </div>
  );

};

export default Routes;
