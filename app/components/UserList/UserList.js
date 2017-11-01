import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BillsList from '../BillsList/BillsList.js';
import ChoresList from '../ChoresList/ChoresList.js';

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      currentView: ''
    };
  }

  render() {
    const {
      usersHouse,
      currentUser,
      markBillPaid,
      match,
      markChoreDone
    } = this.props;
    const placeRendered = match.url;
    return (
      <div>
        <h2>My Lists</h2>
        <button
          onClick={() => { this.setState({ currentView: 'bills'}); }}>
          View Bills
        </button>
        <button
          onClick={() => { this.setState({ currentView: 'chores'}); }}>
          View Chores
        </button>
        {this.state.currentView === 'bills' ?
          <BillsList usersHouse={usersHouse}
            currentUser={currentUser}
            placeRendered={placeRendered}
            markBillPaid={markBillPaid}/>
          : null}
        {this.state.currentView === 'chores' ?
          <ChoresList usersHouse={usersHouse}
            currentUser={currentUser}
            placeRendered={placeRendered}
            markChoreDone={markChoreDone}
            claimChore={() => {}}/>
          : null}
      </div>
    );
  }
}

export default UserList;

UserList.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  markBillPaid: PropTypes.func,
  match: PropTypes.object,
  markChoreDone: PropTypes.func
};
