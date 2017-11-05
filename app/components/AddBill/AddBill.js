import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddBill extends Component {

  constructor() {
    super();
    this.state = {
      item: '',
      split: '',
      equalSelect: [],
      title: '',
      duedate: '',
      total: '',
      allUsersTotals: [],
      details: '',
      buttonDisabled: true,
      error: '',
      percentageLeft: 100,
      dollarLeft: ''
    };
  }

  handleChange(event, type) {
    const { value } = event.target;
    this.setState({
      [type]: value
    });
  }

  updateSplit = (val) => {
    if (this.state.total === '' || this.state.total <= 0) {
      this.setState({ error: 'Please enter a bill total.' });
      return;
    }
    val === 'calculated' ?
      this.setState({ split: val, buttonDisabled: false })
      : this.setState({
        split: val,
        buttonDisabled: true,
        allUsersTotals: [],
        percentageLeft: 100,
        dollarLeft: this.state.total
      });
  }

  updateCustomPSplit = (event, id) => {
    const percentage = parseInt(event.target.value, 10);
    const total = parseInt(this.state.total, 10) * (percentage / 100);
    const userTotalObj = {
      id,
      total,
      paid: false
    };
    const removeUser = this.state.allUsersTotals.filter(user => user.id !== id);
    const newState = [...removeUser, userTotalObj];
    const userTotals = newState.reduce((acc, user) => {
      return acc += parseInt(user.total, 10);
    }, 0);
    const dollarLeft = parseInt(this.state.total, 10) - userTotals;
    const percentageLeft = (dollarLeft / parseInt(this.state.total, 10)) * 100;
    this.setState({ allUsersTotals: newState, percentageLeft: percentageLeft });
  }

  updateCustomDSplit = (event, id) => {
    const removeUser = this.state.allUsersTotals.filter(user => user.id !== id);
    const newState = [...removeUser, { id: id, total: event.target.value, paid: false }];
    const usersTotals = newState.reduce((acc, user) => {
      return acc += parseInt(user.total, 10);
    }, 0);
    const newDollarLeft = parseInt(this.state.total, 10) - parseInt(usersTotals, 10);
    const updateSubmit = newDollarLeft <= 0 ? false : true;
    this.setState({ allUsersTotals: newState, dollarLeft: newDollarLeft, buttonDisabled: updateSubmit });
  }

  splitEqually = () => {
    if (this.state.total === 0) {
      this.setState({ error: 'Please enter a bill total.' });
      return;
    }
    const { users } = this.props.usersHouse;
    const userTotal = this.state.total / users.length;
    const newState = users.map(user => ({
      id: user.id,
      total: userTotal,
      paid: false
    }));
    this.setState({ split: 'equalAll', allUsersTotals: newState, buttonDisabled: false });
  }

  equalSelectSplit = (id) => {
    const { equalSelect } = this.state;
    let newState;
    if (equalSelect.includes(id)) {
      newState = equalSelect.filter(userId => userId !== id);
    } else {
      newState = [...equalSelect, id];
    }
    this.setState({ equalSelect: newState });
  }

  updateEqualSplit = () => {
    const { equalSelect } = this.state;
    const total = this.state.total / equalSelect.length;
    const newState = equalSelect.map(id => ({ id, total, paid: false }));
    this.setState({ split: 'calculated', allUsersTotals: newState, buttonDisabled: false });
  }

  addBill = () => {
    const { title, duedate, total, allUsersTotals, details } = this.state;
    const bill = {
      title,
      duedate,
      total,
      allUsersTotals,
      details,
      postedBy: this.props.currentUser,
      parsedDuedate: Date.parse(duedate),
      datePosted: this.props.getTodaysDate(),
      id: `b${Date.parse(duedate) + Date.now()}`
    };
    this.props.addBill(bill, this.props.usersHouse);
    this.props.updateItem('');
  }

  toggleCalculateButton = () => {
    if (this.state.split === 'equal' && this.state.equalSelect.length > 0) {
      return false;
    }
    if (this.state.split === 'customP' && this.state.percentageLeft === 0 ) {
      return false;
    }
    if (this.state.split === 'customD' && this.state.dollarLeft === 0) {
      return false;
    }
    return true;
  }

  reset = () => {
    document.querySelector('.bill-input').value = "";
    const newState = {
      item: '',
      split: '',
      equalSelect: [],
      title: '',
      duedate: '',
      total: '',
      allUsersTotals: [],
      details: '',
      buttonDisabled: true,
      error: '',
      percentageLeft: 100,
      dollarLeft: ''
    };
    this.setState(newState);
  }

  isActive = button => {
    return this.state.split === button ? 'active' : '';
  }



  renderWithButton = elements => {
    return (<div>
      {elements}
      <button
        className='calculate-button'
        onClick={this.state.split === 'equal' ? this.updateEqualSplit : () => this.updateSplit('calculated')}
        disabled={this.toggleCalculateButton()}>
        Calculate
      </button>
    </div>);
  }

  render() {
    const { usersHouse } = this.props;
    const equalCalc = usersHouse.users.map(user => {
      return <div key={user.id}>
        <input type="checkbox" id={user.id} onChange={() => { this.equalSelectSplit(user.id); }}/>
        <label htmlFor={user.id}>{user.name}</label>
      </div>;
    });
    const equalAll = this.state.allUsersTotals.map(userBill => {
      const userName = usersHouse.users.find(user => user.id === userBill.id).name;
      return <div key={userBill.id}>
        <p>{userName}</p><p>{userBill.total}</p>
      </div>;
    });
    const customPCalc = <div>
      <p>{this.state.split === 'customP' ? `${this.state.percentageLeft} percentage of bill left` : `$ ${this.state.dollarLeft} left of bill`}</p>
      {usersHouse.users.map(user => {
        const customPFunc = (event) => this.updateCustomPSplit(event, user.id);
        const customDFunc = (event) => this.updateCustomDSplit(event, user.id);
        return <div key={user.id}>
          <input className='bill-input user-box' type="text"
            id={user.id}
            placeholder={this.state.split === 'customP' ? "percentage" : "dollar amount" }
            onChange={this.state.split === 'customP' ? customPFunc : customDFunc}/>
          <label htmlFor={user.id}>{user.name}</label>
        </div>;
      })}
    </div>;
    return (
      <div className='add-bill'>
        <div className='inputs-and-splits'>
          <div className='add-bill-inputs'>
            <input className='bill-input title-input' type='text' placeholder='Title' onChange={(event) => this.handleChange(event, 'title')}/>
            <input className='bill-input duedate-input' type='text' placeholder='Due Date' onChange={(event) => this.handleChange(event, 'duedate')}/>
            <input className='bill-input total-input' type='text' placeholder='Total' onChange={(event) => this.handleChange(event, 'total')}/>
          </div>
          <div className='split-buttons'>
            <button className={`split equal-all-button ${this.isActive('equalAll')}`} onClick={this.splitEqually}>Equal Split with All House Members</button>
            <button className={`split equal-select-button ${this.isActive('equal')}`} onClick={() => this.updateSplit('equal')}>Equal Split with Select House Members</button>
            <button className={`split custom-percentage-button ${this.isActive('customP')}`} onClick={() => this.updateSplit('customP')}>Custom Split by Percentage</button>
            <button className={`split custom-dollar-button ${this.isActive('customD')}`} onClick={() => this.updateSplit('customD')}>Custom Split by Dollar Amount</button>
          </div>
        </div>
        <div className='split-info'>
          <p>{this.state.error.length ? this.state.error : null}</p>
          {this.state.split === 'equalAll' ? equalAll : null}
          {this.state.split === 'calculated' ? equalAll : null}
          {this.state.split === 'equal' ? this.renderWithButton(equalCalc) : null}
          {this.state.split === 'customP' ? this.renderWithButton(customPCalc) : null}
          {this.state.split === 'customD' ? customPCalc : null}
        </div>
        <div className='details-and-buttons'>
          <textarea type='text' placeholder='Details' onChange={(event) => this.handleChange(event, 'details')}/>
          <div className='form-buttons'>
            <button className='bill-submit' onClick={() => this.addBill()} disabled={this.state.buttonDisabled}>Submit</button>
            <button onClick={this.reset}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddBill;

AddBill.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  addBill: PropTypes.func,
  getTodaysDate: PropTypes.func,
  updateItem: PropTypes.func
};
