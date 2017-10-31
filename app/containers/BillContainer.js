import Bill from '../components/Bill/Bill.js';
import { connect } from 'react-redux';
import { markBillPaid } from '../actions/actions.js';

const mapStateToProps =  store => ({
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({
  markBillPaid: (billId, userId, usersHouse) => {
    dispatch(markBillPaid(billId, userId, usersHouse));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Bill);
