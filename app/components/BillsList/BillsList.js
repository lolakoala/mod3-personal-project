import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BillsList extends Component {
  getMyBills = (bills, id) => {
    return bills.filter(bill => {
      const usersOwe = bill.allUsersTotals.map(user => user.id);
      return usersOwe.includes(id);
    }).sort((itemA, itemB) => Date.parse(itemB.datePosted) - Date.parse(itemA.datePosted));
  }

  getBillsDue = (bills, id) => {
    return bills.filter(bill => {
      return bill.allUsersTotals.find(user => user.id === id).paid === false;
    }).sort((itemA, itemB) => Date.parse(itemA.datePosted) - Date.parse(itemB.datePosted));
  }

  getBillsNotPaidByAll = bills => {
    return bills.filter(bill => {
      const usersNotPaid = bill.allUsersTotals.filter(user => user.paid === false);
      return usersNotPaid.length > 0;
    }).sort((itemA, itemB) => Date.parse(itemA.datePosted) - Date.parse(itemB.datePosted));
  }

  getMatchingBills = (bills, value) => {
    return bills.filter(bill => {
      return bill.title.includes(value) || bill.details.includes(value);
    }).sort((itemA, itemB) => Date.parse(itemB.datePosted) - Date.parse(itemA.datePosted));
  }

  getBillsToMap = () => {
    const { usersHouse, currentUser, placeRendered, searchValue } = this.props;
    if (placeRendered === '/') {
      return this.getBillsDue(this.getMyBills(usersHouse.bills, currentUser.id), currentUser.id);
    } else if (placeRendered === '/userlist') {
      return this.getMyBills(usersHouse.bills, currentUser.id);
    } else if (placeRendered === '/houselist') {
      return usersHouse.bills.sort((itemA, itemB) => Date.parse(itemB.datePosted) - Date.parse(itemA.datePosted));
    } else if (placeRendered === 'summary') {
      return this.getBillsNotPaidByAll(usersHouse.bills);
    } else if (placeRendered === 'search') {
      return this.getMatchingBills(usersHouse.bills, searchValue);
    }
  }

  getError = () => {
    const { placeRendered, usersHouse } = this.props;
    if (placeRendered === '/') {
      return 'You have no unpaid bills.';
    } else if (placeRendered === '/userlist') {
      return 'You have no bills posted.';
    } else if (placeRendered === '/houselist') {
      return `${usersHouse.houseName} has no bills posted.`;
    } else if (placeRendered === 'summary') {
      return `${usersHouse.houseName} has no unpaid bills posted.`;
    } else if (placeRendered === 'search') {
      return 'No bills match your query.';
    }
  }


  markBillPaid = (billId, userId, usersHouse) => {
    this.props.markBillPaid(billId, userId, usersHouse);
    this.forceUpdate();
  }

  getHouseBills = bills => {
    const { currentUser, usersHouse } = this.props;
    return bills.map(bill => {
      return (<div key={bill.parsedDuedate} className='bill'>
        <Link to={`bills/${bill.id}`}>{bill.title}</Link>
        <p className='due'>{`Due: ${bill.duedate}`}</p>
        <p className='total'>{`Total: ${bill.total}`}</p>
        <p className='mark-paid' onClick={() => this.markBillPaid(bill.id, currentUser.id, usersHouse)}>
          {bill.allUsersTotals.find(user => user.id === currentUser.id).paid ? `I'm paid up.` : 'Mark Paid'}
        </p>
      </div>);
    });
  }

  getUserBills = bills => {
    const { currentUser, usersHouse } = this.props;
    return bills.map(bill => {
      const user = bill.allUsersTotals.find(user => user.id === currentUser.id);
      return (<div key={bill.parsedDuedate} className='bill'>
        <Link to={`bills/${bill.id}`}>{bill.title}</Link>
        <p className='due'>{`Due: ${bill.duedate}`}</p>
        <p className='total'>{`My Total: ${user.total}`}</p>
        <p className='mark-paid' onClick={() => this.markBillPaid(bill.id, currentUser.id, usersHouse)}>{user.paid ? `I'm paid up.` : 'Mark Paid'}</p>
      </div>);
    });
  }

  render() {
    const { placeRendered, usersHouse } = this.props;
    if (usersHouse.bills.length && usersHouse.bills[0].title !== 'fake') {
      const billsToMap = this.getBillsToMap();
      if (billsToMap.length) {
        return (
          <div className='billslist'>
            {placeRendered === '/' ? <h4>Bills You Owe</h4> : null}
            {placeRendered === 'summary' ? <h4>Bills Not All Paid Up</h4> : null}
            {placeRendered === '/houselist' ? this.getHouseBills(billsToMap) : null}
            {placeRendered === '/' ? this.getUserBills(billsToMap) : null}
            {placeRendered === '/userlist' ? this.getUserBills(billsToMap) : null}
            {placeRendered === 'summary' ? this.getHouseBills(billsToMap) : null}
            {placeRendered === 'search' ? this.getHouseBills(billsToMap) : null}
          </div>
        );

      } else {
        return (
          <p className='error'>{this.getError()}</p>
        );
      }
    } else {
      return (
        <p className='error'>{`${usersHouse.houseName} has no bills posted.`}</p>
      );
    }

  }
}

export default BillsList;

BillsList.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  markBillPaid: PropTypes.func,
  placeRendered: PropTypes.string,
  searchValue: PropTypes.string
};
