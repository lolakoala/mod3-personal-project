import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddBill from '../AddBill/AddBill.js';
import AddBulletin from '../AddBulletin/AddBulletin.js';

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

  renderButtons = () => {
    return (
      <div>
        <button onClick={() => this.updateItem('bill')}>Add Bill</button>
        <button onClick={() => this.updateItem('chore')}>Add Chore</button>
        <button onClick={() => this.updateItem('bulletin')}>Add Bulletin</button>
      </div>
    );
  }

  render() {
    const { usersHouse, currentUser, addBill, addBulletin } = this.props;
    return (
      <div>
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
      </div>
    );
  }
}

export default AddItem;

AddItem.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  addBulletin: PropTypes.func,
  addBill: PropTypes.func
};
