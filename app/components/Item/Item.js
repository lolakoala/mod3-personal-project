import React, { Component } from 'react';
import PropTypes from 'prop-types';
//link back to houselist
import { Link } from 'react-router-dom';

class  Item extends Component {
  render() {

    const bill = this.props.usersHouse.bills.find(bill => bill.id === this.props.match.params.id);
    return (
      <div>
        <p>{`Bill: ${bill.title}`}</p>
        <p>{`Due: ${bill.duedate}`}</p>
        <p>{`Total: ${bill.total}`}</p>
        <p>{`Posted by ${bill.postedBy.name} on ${bill.datePosted}`}</p>
        <p>{`Details: ${bill.details}`}</p>
        <p>House Split:</p>
        {bill.allUsersTotals.map(user => {
          const name = this.props.usersHouse.users.find(houseMember => houseMember.id === user.id).name;
          return (<div key={`${bill.parsedDuedate}, ${user.id}`}>
            <p>{`${name}: ${user.total}`}</p>
          </div>);
        })}
      </div>
    );
  }

}

export default Item;

Item.propTypes = {
  // bill: PropTypes.object,
  usersHouse: PropTypes.object
};
