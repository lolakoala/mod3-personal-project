import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bill extends Component {
  markBillPaid = (billId, userId, usersHouse) => {
    this.props.markBillPaid(billId, userId, usersHouse);
    this.forceUpdate();
  }

  render() {
    const { usersHouse } = this.props;
    const bill = usersHouse.bills.find(bill => bill.id === this.props.match.params.id);
    return (
      <div>
        <p className='title'>{`Bill: ${bill.title}`}</p>
        <p className='duedate'>{`Due: ${bill.duedate}`}</p>
        <p className='total'>{`Total: ${bill.total}`}</p>
        <p className='posted-by-on'>{`Posted by ${bill.postedBy.name} on ${bill.datePosted}`}</p>
        <p className='details'>{`Details: ${bill.details}`}</p>
        <p className='split'>House Split:</p>
        {bill.allUsersTotals.map(user => {
          const name = usersHouse.users.find(houseMember => houseMember.id === user.id).name;
          return (<div key={`${bill.parsedDuedate} ${user.id} user-split`} className='user-split'>
            <p>{`${name}: ${user.total}`}</p>
            <p className='mark-paid' onClick={() => this.markBillPaid(bill.id, user.id, usersHouse)}>{user.paid ? 'Paid' : 'Mark as Paid'}</p>
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
