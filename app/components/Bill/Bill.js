import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bill extends Component {
  markBillPaid = (billId, userId, usersHouse) => {
    this.props.markBillPaid(billId, userId, usersHouse);
    this.forceUpdate();
  }

  unPaid = id => {
    const { currentUser } = this.props;
    return id === currentUser.id ? 'Mark as Paid' : 'Not Yet Paid';
  }

  render() {
    const { usersHouse } = this.props;
    const bill = usersHouse.bills.find(bill => bill.id === this.props.match.params.id);
    return (
      <div id='bill-page'>
        <p className='title'>{`Bill: ${bill.title}`}</p>
        <div className='due-total'>
          <p className='duedate'>{`Due: ${bill.duedate}`}</p>
          <p className='total'>{`Total: ${bill.total}`}</p>
        </div>
        <p className='details'>{`Details: ${bill.details}`}</p>
        <p className='split'>House Split...</p>
        {bill.allUsersTotals.map(user => {
          const name = usersHouse.users.find(houseMember => houseMember.id === user.id).name;
          return (<div key={`${bill.parsedDuedate} ${user.id}`} className='user-split'>
            <p>{`${name}: ${user.total}`}</p>
            <div className='mark-paid' onClick={() => this.markBillPaid(bill.id, user.id, usersHouse)}><p>{user.paid ? 'Paid' : this.unPaid(user.id)}</p></div>
          </div>);
        })}
        <p className='posted-by-on'>{`Posted by ${bill.postedBy.name} on ${bill.datePosted}`}</p>
      </div>
    );

  }
}

export default Bill;

Bill.propTypes = {
  usersHouse: PropTypes.object,
  markBillPaid: PropTypes.func,
  match: PropTypes.object,
  currentUser: PropTypes.object
};
