import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BillsList extends Component {
  getBillsToMap = () => {
    let billsToMap;
    const { usersHouse, currentUser, placeRendered } = this.props;
    const mybills = usersHouse.bills.filter(bill => {
      const usersOwe = bill.allUsersTotals.map(user => user.id);
      return usersOwe.includes(currentUser.id);
    });
    const billsDue = mybills.filter(bill => {
      return bill.allUsersTotals.find(user => user.id === currentUser.id).paid === false;
    });
    const billsNotPaidByAll = usersHouse.bills.filter(bill => {
      const usersNotPaid = bill.allUsersTotals.filter(user => user.paid === false);
      return usersNotPaid.length > 0;
    });
    if (placeRendered === '/') {
      billsToMap = billsDue;
    } else if (placeRendered === '/userlist') {
      billsToMap = mybills;
    } else if (placeRendered === '/houselist') {
      billsToMap = usersHouse.bills;
    } else if (placeRendered === 'summary') {
      billsToMap = billsNotPaidByAll;
    }
    return billsToMap;
  }

  getTitle = () => {
    const { placeRendered } = this.props;
    let title;
    if (placeRendered === '/') {
      title = 'Bills I Owe';
    } else if (placeRendered === '/userlist') {
      title = 'My Bills';
    } else if (placeRendered === '/houselist') {
      title = 'House Bills';
    } else if (placeRendered === 'summary') {
      title = 'Bills to Be Paid';
    }
    return title;
  }

  markBillPaid = (billId, userId, usersHouse) => {
    this.props.markBillPaid(billId, userId, usersHouse);
    this.forceUpdate();
  }

  getHouseBills = bills => {
    const { currentUser, usersHouse } = this.props;
    return bills.map(bill => {
      return (<div key={bill.parsedDuedate}>
        <Link to={`bills/${bill.id}`}>{bill.title}</Link>
        <p>{bill.duedate}</p>
        <p>{bill.total}</p>
        <div onClick={() => this.markBillPaid(bill.id, currentUser.id, usersHouse)}>
          {bill.allUsersTotals.find(user => user.id === currentUser.id).paid ? 'Paid' : 'Mark as Paid'}
        </div>
      </div>);
    });
  }

  getUserBills = bills => {
    const { currentUser, usersHouse } = this.props;
    return bills.map(bill => {
      const user = bill.allUsersTotals.find(user => user.id === currentUser.id);
      return (<div key={bill.parsedDuedate}>
        <Link to={`bills/${bill.id}`}>{bill.title}</Link>
        <p>{bill.duedate}</p>
        <p>{user.total}</p>
        <div onClick={() => this.markBillPaid(bill.id, currentUser.id, usersHouse)}>{user.paid ? 'Paid' : 'Mark as Paid'}</div>
      </div>);
    });
  }

  render() {
    const { placeRendered, usersHouse } = this.props;
    if (usersHouse.bills.length && usersHouse.bills[0].title !== 'fake') {
      const billsToMap = this.getBillsToMap();
      if (billsToMap.length) {
        return (
          <div>
            <h2>{this.getTitle()}</h2>
            <h4>Title</h4>
            <h4>Due Date</h4>
            <h4>{placeRendered === '/houselist' ? 'Total' :'My Total'}</h4>
            <h4>{placeRendered === '/houselist' ? 'All Paid' : 'Mark as Paid'}</h4>
            {placeRendered === '/houselist' ? this.getHouseBills(billsToMap) : null}
            {placeRendered === '/' ? this.getUserBills(billsToMap) : null}
            {placeRendered === '/userlist' ? this.getUserBills(billsToMap) : null}
            {placeRendered === 'summary' ? this.getHouseBills(billsToMap) : null}
          </div>
        );

      } else {
        return (
          <div></div>
        );
      }
    } else {
      return (
        <div></div>
      );
    }

  }
}

export default BillsList;

BillsList.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  markBillPaid: PropTypes.func,
  placeRendered: PropTypes.string
};
