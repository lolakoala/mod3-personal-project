import AddItem from '../components/AddItem/AddItem.js';
import { connect } from 'react-redux';
import { addBill } from '../actions/actions.js';

const mapStateToProps =  store => ({
  currentUser: store.currentUser,
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({
  addBill: (bill, usersHouse) => {
    dispatch(addBill(bill, usersHouse));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
