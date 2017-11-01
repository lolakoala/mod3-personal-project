import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BillsList from '../BillsList/BillsList.js';
import BulletinsList from '../BulletinsList/BulletinsList.js';
import ChoresList from '../ChoresList/ChoresList.js';
import Summary from '../Summary/Summary';

class HouseList extends Component {
  constructor() {
    super();
    this.state = {
      currentView: '',
      searchInput: ''
    };
  }

  render() {
    const {
      currentUser,
      usersHouse,
      match,
      addReaderToBulletin,
      markChoreDone,
      claimChore,
      markBillPaid
    } = this.props;

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
            markBillPaid={markBillPaid}
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
            placeRendered={match.url}
            markChoreDone={markChoreDone}
            claimChore={claimChore}/>
          : null}
        {this.state.currentView === 'summary' ?
          <Summary usersHouse={usersHouse}
            currentUser={currentUser}
            markChoreDone={markChoreDone}
            claimChore={claimChore}
            addReaderToBulletin={addReaderToBulletin}
            markBillPaid={() => {}}
            placeRendered='summary'/>
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
  match: PropTypes.object,
  markChoreDone: PropTypes.func,
  claimChore: PropTypes.func,
  markBillPaid: PropTypes.func
};
