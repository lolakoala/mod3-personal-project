import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddBill from '../AddBill/AddBill.js';
import AddBulletin from '../AddBulletin/AddBulletin.js';
import AddChore from '../AddChore/AddChore.js';

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      item: ''
    };
  }

  updateItem = val => {
    this.setState({ item: val });
  }

  getTodaysDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if ( mm < 10) {
      mm='0'+mm;
    }
    return `${mm}/${dd}/${yyyy}`;
  }

  isActive = item => {
    return this.state.item === item ? 'active' : '';
  }

  renderButtons = () => {
    return (
      <div className='additem'>
        <button className={`add-bill-button ${this.isActive('bill')}`} onClick={() => this.updateItem('bill')}>Add Bill</button>
        <button className={`add-chore-button ${this.isActive('chore')}`} onClick={() => this.updateItem('chore')}>Add Chore</button>
        <button className={`add-bulletin-button ${this.isActive('bulletin')}`} onClick={() => this.updateItem('bulletin')}>Add Bulletin</button>
      </div>
    );
  }

  render() {
    const { usersHouse, currentUser, addBill, addBulletin, addChore } = this.props;
    return (
      <div className='additem-with-items'>
        {usersHouse.users ? this.renderButtons() : null}
        {this.state.item === 'bill' ?
          <AddBill usersHouse={usersHouse}
            currentUser={currentUser}
            addBill={addBill}
            getTodaysDate={this.getTodaysDate}
            updateItem={this.updateItem}/>
          : null}
        {this.state.item === 'bulletin' ?
          <AddBulletin usersHouse={usersHouse}
            currentUser={currentUser}
            addBulletin={addBulletin}
            getTodaysDate={this.getTodaysDate}
            updateItem={this.updateItem}/>
          : null}
        {this.state.item === 'chore' ?
          <AddChore usersHouse={usersHouse}
            currentUser={currentUser}
            addChore={addChore}
            getTodaysDate={this.getTodaysDate}
            updateItem={this.updateItem}/>
          : null}
      </div>
    );
  }
}

export default AddItem;

AddItem.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  addBulletin: PropTypes.func,
  addBill: PropTypes.func,
  addChore: PropTypes.func
};
