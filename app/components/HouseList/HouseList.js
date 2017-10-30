import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class HouseList extends Component {
  constructor() {
    super();
    this.state = {
      currentView: '',
      searchInput: ''
    };
  }

  renderBills = () => {
    const { bills } = this.props.usersHouse;
    return (
      <div>
        <Link to='/addbill'>Add Bill</Link>
        <input type='text' placeholder='search'/>
        <h4>Title</h4>
        <h4>Due Date</h4>
        <h4>Total</h4>
        <h4>All Paid</h4>
        {bills.map(bill => {
          return (<div key={bill.parsedDuedate}>
            <Link to={`bills/${bill.id}`}>{`Bill: ${bill.title}`}</Link>
            <p>{`Due: ${bill.duedate}`}</p>
            <p>{`Total: ${bill.total}`}</p>
          </div>);
        })}
      </div>
    );
  }

  render() {
    const bills = this.renderBills();

    return (
      <div>
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
        {this.state.currentView === 'bills' ? bills : null}
      </div>
    );
  }

}

export default HouseList;

HouseList.propTypes = {
  usersHouse: PropTypes.object
};
