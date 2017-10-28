import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class HouseList extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: ''
    };
  }

  render() {
    const { bills } = this.props.usersHouse;
    return (
      <div>
        <Link to='/addbill'>Add Bill</Link>
        <input type='text' placeholder='search'/>
        {bills.map(bill => {
          return (<div key={bill.parsedDuedate}>
            <p>{`Bill: ${bill.title}`}</p>
            <p>{`Due: ${bill.duedate}`}</p>
            <p>{`Total: ${bill.total}`}</p>
            <p>{`Posted by ${bill.postedByname} on ${bill.datePosted}`}</p>
            <p>{`Details: ${bill.details}`}</p>
            <p>House Split:</p>
            {bill.allUsersTotals.map(user => {
              const name = this.props.usersHouse.users.find(houseMember => houseMember.id === user.id).name;
              return (<div key={`${bill.parsedDuedate}, ${user.id}`}>
                <p>{`${name}: ${user.total}`}</p>

              </div>);
            })}
          </div>);
        })}
      </div>
    );
  }
}

export default HouseList;

HouseList.propTypes = {
  usersHouse: PropTypes.object
};
