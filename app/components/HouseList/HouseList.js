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

  isActive = button => {
    return this.state.currentView === button ? 'active' : '';
  }

  handleSearch = event => {
    const { bills, chores, bulletins } = this.props.usersHouse;
    const { value } = event.target;
    let searchResults = false;
    const billsMatch = bills.filter(bill => {
      return bill.title.includes(value) || bill.details.includes(value);
    });
    const choresMatch = chores.filter(chore => {
      return chore.title.includes(value) || chore.details.includes(value);
    });
    const bulletinsMatch = bulletins.filter(bulletin => {
      return bulletin.title.includes(value) || bulletin.details.includes(value);
    });
    if (bulletinsMatch.length > 0 || billsMatch.length > 0 || choresMatch.length > 0) {
      searchResults = true;
    }
    if (bulletinsMatch.length === bulletins.length && billsMatch.length === bills.length && choresMatch.length === chores.length) {
      this.setState({ currentView: '', searchInput: value });
      return;
    }
    searchResults ?
      this.setState({ currentView: 'search', searchInput: value })
      : this.setState({ currentView: '', searchInput: value });
  };

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
      <div className='house-list'>
        <div className='houselist-nav'>
          <input onChange={event => this.handleSearch(event)} type='text' placeholder='search'/>
          <div>
            <button
              className={`${this.isActive('bills')} view-bills`}
              onClick={() => { this.setState({ currentView: 'bills'}); }}>
              View Bills
            </button>
            <button
              className={`${this.isActive('bulletins')} view-bulletins`}
              onClick={() => { this.setState({ currentView: 'bulletins'}); }}>
              View Bulletins
            </button>
          </div>
          <div>
            <button
              className={`${this.isActive('chores')} view-chores`}
              onClick={() => { this.setState({ currentView: 'chores'}); }}>
              View Chores
            </button>
            <button
              className={`${this.isActive('summary')} view-summary`}
              onClick={() => { this.setState({ currentView: 'summary'}); }}>
              View Summary
            </button>
          </div>
          <Link to='/additem'>Add Bills, Chores, or Bulletins</Link>
        </div>
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
        {this.state.currentView === 'search' ?
          <div>
            <BillsList usersHouse={usersHouse}
              currentUser={currentUser}
              markBillPaid={markBillPaid}
              searchValue={this.state.searchInput}
              placeRendered={'search'}/>
            <BulletinsList usersHouse={usersHouse}
              currentUser={currentUser}
              addReaderToBulletin={addReaderToBulletin}
              searchValue={this.state.searchInput}
              placeRendered={'search'}/>
            <ChoresList usersHouse={usersHouse}
              currentUser={currentUser}
              placeRendered={'search'}
              markChoreDone={markChoreDone}
              searchValue={this.state.searchInput}
              claimChore={claimChore}/>
          </div>
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
