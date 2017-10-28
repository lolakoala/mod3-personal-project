import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      split: '',
      title: '',
      duedate: '',
      total: '',
      allUsersTotals: [],
      details: ''
    };
  }

  handleChange(event, type) {
    const { value } = event.target;
    this.setState({
      [type]: value
    });
  }

  updateSplit = (val) => {
    this.setState({ split: val });
  }

  addBill = () => {
    //set allUserstotals in state - an array of objects with user and total keys
    //create object that has title, duedate, total, allUserstotals, and details
    //maybe just pass state?
    //pass bill object to action
    //user will need to be sent to either dash or houselist for bills
  }

  getAllUsersTotals = () => {
    //for custom total...
    //for each input in the list
    //make object with user and then total where total is percentage of total, percentage taken from input field
  }

  updateCustomPSplit = (event, id) => {
    const percentage = parseInt(event.target.value, 10);
    const total = parseInt(this.state.total, 10) * (percentage / 100);
    const userTotalObj = {
      id,
      total
    };
    const removeUser = this.state.allUsersTotals.filter(user => user.id !== id);
    const newState = [...removeUser, userTotalObj];
    this.setState({ allUsersTotals: newState });
  }

  updateCustomDSplit = (event, id) => {
    const removeUser = this.state.allUsersTotals.filter(user => user.id !== id);
    const newState = [...removeUser, { id: id, total: event.target.value }];
    this.setState({ allUsersTotals: newState });
  }

  splitEqually = () => {
    const { users } = this.props.usersHouse;
    const userTotal = this.state.total / users.length;
    const newState = users.map(user => ({
      id: user.id,
      total: userTotal
    }));
    this.setState({ allUsersTotals: newState });
  }

  //Equal Split with All House Members
  //Equal Split with Select House Members
  //Custom Split by Percentage
  //Custom Split by Dollar Amount

  render() {
    const { usersHouse } = this.props;
    const equalCalc = usersHouse.users.map(user => {
      return <div key={user.id}>
        <input type="checkbox" id={user.id}/>
        <label htmlFor={user.id}>{user.name}</label>
      </div>;
    });
    const customPCalc = usersHouse.users.map(user => {
      const customPFunc = (event) => this.updateCustomPSplit(event, user.id);
      const customDFunc = (event) => this.updateCustomDSplit(event, user.id);
      return <div key={user.id}>
        <input type="text"
          id={user.id}
          placeholder={this.state.split === 'customP' ? "percentage" : "dollar amount" }
          onChange={this.state.split === 'customP' ? customPFunc : customDFunc}/>
        <label htmlFor={user.id}>{user.name}</label>
      </div>;
    });
    return (
      <div>
        <input type='text' placeholder='Title' onChange={(event) => this.handleChange(event, 'title')}/>
        <input type='text' placeholder='Due Date' onChange={(event) => this.handleChange(event, 'duedate')}/>
        <input type='text' placeholder='Total' onChange={(event) => this.handleChange(event, 'total')}/>
        <button onClick={this.splitEqually}>Equal Split with All House Members</button>
        <button onClick={() => this.updateSplit('equal')}>Equal Split with Select House Members</button>
        <button onClick={() => this.updateSplit('customP')}>Custom Split by Percentage</button>
        <button onClick={() => this.updateSplit('customD')}>Custom Split by Dollar Amount</button>
        {this.state.split === 'equal' ? equalCalc : null}
        {this.state.split === 'customP' ? customPCalc : null}
        {this.state.split === 'customD' ? customPCalc : null}
        <textarea type='text' placeholder='Details' onChange={(event) => this.handleChange(event, 'details')}/>
        <button onClick={this.addbill}>Add Bill</button>
        {/* when user is in local storage, this button will just refresh page <button>Clear Bill</button> */}

      </div>
    );
  }
}

export default AddItem;

AddItem.propTypes = {
  usersHouse: PropTypes.object
};
