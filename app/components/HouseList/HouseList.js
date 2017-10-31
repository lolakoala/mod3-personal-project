import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BillsList from '../BillsList/BillsList.js';
import BulletinsList from '../BulletinsList/BulletinsList.js';
import ChoresList from '../ChoresList/ChoresList.js';

class HouseList extends Component {
  constructor() {
    super();
    this.state = {
      currentView: '',
      searchInput: ''
    };
  }

  render() {
    const { currentUser, usersHouse, match, addReaderToBulletin } = this.props;

    return (
      <div>
        <input type='text' placeholder='search'/>
        <button
          onClick={() => { this.setState({ currentView: 'bills'}); }}>
          View Bills
        </button>
        <button
          onClick={() => { this.setState({ currentView: 'bulletins'}); }}>
          View Bulletins
        </button>
        <button
          onClick={() => { this.setState({ currentView: 'chores'}); }}>
          View Chores
        </button>
        <button
          onClick={() => { this.setState({ currentView: 'summary'}); }}>
          View Summary
        </button>
        <Link to='/additem'>Add Bills, Chores, or Bulletins</Link>
        {this.state.currentView === 'bills' ?
          <BillsList usersHouse={usersHouse}
            currentUser={currentUser}
            markBillPaid={() => {}}
            placeRendered={match.url}/>
          : null}
        {this.state.currentView === 'bulletins' ?
          <BulletinsList usersHouse={usersHouse}
            currentUser={currentUser}
            addReaderToBulletin={addReaderToBulletin}
            placeRendered={match.url}/>
          : null}
        {this.state.currentView === 'chores' ?
          <ChoresList usersHouse={usersHouse}
            currentUser={currentUser}
            placeRendered={match.url}/>
          : null}
      </div>
    );
  }

}

export default HouseList;

HouseList.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  addReaderToBulletin: PropTypes.func,
  match: PropTypes.object
};
