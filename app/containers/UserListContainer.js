import UserList from '../components/UserList/UserList.js';
import { connect } from 'react-redux';
import { addReaderToBulletin, markBillPaid, markChoreDone } from '../actions/actions.js';

const mapStateToProps =  store => ({
  currentUser: store.currentUser,
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({
  addReaderToBulletin: (bulletinId, userId, usersHouse) => {
    dispatch(addReaderToBulletin(bulletinId, userId, usersHouse));
  },
  markBillPaid: (billId, userId, usersHouse) => {
    dispatch(markBillPaid(billId, userId, usersHouse));
  },
  markChoreDone: (chore, usersHouse) => {
    dispatch(markChoreDone(chore, usersHouse));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
