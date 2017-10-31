import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bill extends Component {
  render() {
    const { usersHouse, markBillPaid } = this.props;
    const bill = usersHouse.bills.find(bill => bill.id === this.props.match.params.id);
    return (
      <div>
        <p>{`Bill: ${bill.title}`}</p>
        <p>{`Due: ${bill.duedate}`}</p>
        <p>{`Total: ${bill.total}`}</p>
        <p>{`Posted by ${bill.postedBy.name} on ${bill.datePosted}`}</p>
        <p>{`Details: ${bill.details}`}</p>
        <p>House Split:</p>
        {bill.allUsersTotals.map(user => {
          const name = usersHouse.users.find(houseMember => houseMember.id === user.id).name;
          return (<div key={`${bill.parsedDuedate}, ${user.id}`}>
            <p>{`${name}: ${user.total}`}</p>
            <p onClick={() => markBillPaid(bill.id, user.id, usersHouse)}>{user.paid ? 'Paid' : 'Mark as Paid'}</p>
          </div>);
        })}
      </div>
    );

  }
}

export default Bill;

Bill.propTypes = {
  usersHouse: PropTypes.object,
  markBillPaid: PropTypes.func,
  match: PropTypes.object
};
